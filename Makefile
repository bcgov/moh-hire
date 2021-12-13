# EHPR
# Default Environments
-include ./.env

export $(shell sed 's/=.*//' ./.env)

# Project
export PROJECT := $(or $(PROJECT),ehpr)

# Runtime and application Environments specific variable
export NODE_ENV ?= development
export ENV_NAME ?= dev
export POSTGRES_USERNAME = freshworks
export CHES_CLIENT_ID ?= EHPR_SERVICE_CLIENT
export MAIL_FROM ?= noreply@gov.bc.ca

# FE Env Vars
export NEXT_PUBLIC_API_URL = /api/v1

# AWS Environments variables
export AWS_REGION ?= ca-central-1
NAMESPACE = $(PROJECT)-$(ENV_NAME)
APP_SRC_BUCKET = $(NAMESPACE)-app

# Terraform variables
TERRAFORM_DIR = terraform
export BOOTSTRAP_ENV=terraform/bootstrap

define TFVARS_DATA
target_env = "$(ENV_NAME)"
project_code = "$(PROJECT)"
api_artifact = "build/api.zip"
app_sources = "build/app"
app_sources_bucket = "$(APP_SRC_BUCKET)"
domain = ""
db_username = "$(POSTGRES_USERNAME)"
ches_client_id = "$(CHES_CLIENT_ID)"
mail_from = "$(MAIL_FROM)"
endef
export TFVARS_DATA

# Terraform s3 backend config variables
define TF_BACKEND_CFG
region="$(AWS_REGION)"
bucket="$(NAMESPACE)-tf-state"
dynamodb_table="$(NAMESPACE)-tf-lock"
endef
export TF_BACKEND_CFG


.PHONY: app-local print-env start-local-services bootstrap bootstrap-terraform

# Aliases 
bootstrap-terraform: print-env bootstrap
build-terraform-artifact: clean-yarn print-env pre-build build-api

# Local Development
build-artifact-local: build-terraform-artifact
	@yarn
clean-yarn: 
	@rm -rf node_modules
	@yarn
print-env:
	@echo "\n**** ENVIRONMENTS ****\n"
	@echo "\nProject: $(PROJECT)"
	@echo "\nNODE_ENV: $(NODE_ENV)"
	@echo "\nNAMESPACE=$(NAMESPACE)"
	@echo
	@echo ./$(TERRAFORM_DIR)/.auto.tfvars:
	@echo "$$TFVARS_DATA"
	@echo
	@echo ./$(TERRAFORM_DIR)/backend.hcl:
	@echo "$$TF_BACKEND_CFG"
	@echo "\n*********************\n"

app-local: print-env start-local-services
	@echo "++\n***** Running api + web in local Node server\n++"
	@yarn 
	@yarn start:local
start-local-services:
	@echo "++\n***** Starting local services\n++"
	@docker-compose up -d db 
	@echo "++\n*****"

stop-local-services:
	@echo "++\n***** Stopping local services\n++"
	@docker-compose down db
	@echo "++\n*****"

docker-down:
	@echo "++\n***** Stopping Docker containers\n++"
	@docker-compose down
	@echo "++\n*****"

docker-build:
	@echo "++\n***** Running docker-compose\n++"
	@docker-compose build
	@echo "++\n*****"

docker-run:
	@echo "++\n***** Running docker-compose\n++"
	@yarn
	@docker-compose up --build
	@echo "++\n*****"


# Build application stack

pre-build:
	@echo "++\n***** Pre-build Terraform artifact\n++"
	@rm -rf ./terraform/build || true
	@mkdir -p ./terraform/build
	@echo "++\n*****"

build-api:
	@echo "++\n***** Building API for AWS\n++"
	@echo 'Building api package... \n' 
	@yarn workspace @ehpr/api build
	@echo 'Updating prod dependencies...\n'
	@yarn workspaces focus @ehpr/api --production
	@echo 'Deleting existing build dir...\n'
	@rm -rf ./.build || true
	@echo 'Creating build dir...\n'
	@mkdir -p .build/api
	@echo 'Copy Node modules....\n' && cp -r node_modules .build/api
	@echo 'Unlink local packages...\n' && rm -rf .build/api/node_modules/@ehpr/*
	@echo 'Hardlink local packages...\n' 
	@cp -r ./packages/* .build/api/node_modules/@ehpr/
	@echo 'Copy api ...\n' && cp -r apps/api/dist/* .build/api
	@echo 'Copy api/.ormconfig ...\n' && cp -r apps/api/dist/.ormconfig.js .build/api
	@echo 'Creating Zip ...\n' && cd .build && zip -r api.zip ./api && cd ..
	@echo 'Copying to terraform build location...\n'
	@cp ./.build/api.zip ./terraform/build/api.zip
	@echo 'Done!\n'
	@echo "++\n****"

build-web:
	@echo "++\n***** Building Web for AWS\n++"
	@yarn workspace @ehpr/web build
	@yarn workspace @ehpr/web export
	@mv ./apps/web/out ./terraform/build/app
	@echo "++\n*****"

# AWS / Terraform commands

bootstrap:
	## Set-up a S3 bucket for storing terraform state.
	## Only needs to be run once per environment, globally.
	terraform -chdir=$(BOOTSTRAP_ENV) init -input=false -reconfigure \
		-backend-config='path=$(ENV_NAME).tfstate'
	terraform -chdir=$(BOOTSTRAP_ENV) apply -auto-approve -input=false \
		-var='namespace=$(NAMESPACE)'

write-config-tf:
	@echo "$$TFVARS_DATA" > $(TERRAFORM_DIR)/.auto.tfvars
	@echo "$$TF_BACKEND_CFG" > $(TERRAFORM_DIR)/backend.hcl


init-tf: write-config-tf
	# Initializing the terraform environment
	@terraform -chdir=$(TERRAFORM_DIR) init -input=false \
		-reconfigure \
		-backend-config=backend.hcl

plan: init-tf
	# Creating all AWS infrastructure.
	@terraform -chdir=$(TERRAFORM_DIR) plan

deploy-infra: init-tf 
	# Creating all AWS infrastructure.
	@terraform -chdir=$(TERRAFORM_DIR) apply -auto-approve -input=false

deploy-app:
	test -n $(CLOUDFRONT_ID)
	aws s3 sync ./terraform/build/app s3://$(APP_SRC_BUCKET) --delete
	aws --region $(AWS_REGION) cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"

# Deployment CMD
tag-dev:
ifdef comment
	@git tag -fa dev -m "Deploy dev: $(comment)"
else
	@git tag -fa dev -m "Deploy dev: $(git rev-parse --abbrev-ref HEAD)"
endif
	@git push --force origin refs/tags/dev:refs/tags/dev
