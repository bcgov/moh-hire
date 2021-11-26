# EHPR
# Default Environments
-include ./.env

export $(shell sed 's/=.*//' ./.env)

export NODE_ENV ?= development


.PHONY: build api-local web-local print-env run-local

run-local: | build api-local web-local

print-env:
	@echo "\n**** ENVIRONMENTS ****\n"
	@echo "\nProject: $(PROJECT)"
	@echo "\nNODE_ENV: $(NODE_ENV)"
	@echo "\n*********************\n"

build: print-env
	@echo "++\n***** Building All stacks\n++"
	@yarn build

api-local:
	@echo "++\n***** Running API in local Node env\n++"
	@yarn workspace @ehpr/api start:dev:local
	@echo "\n******"

web-local:
	@echo "++\n***** Running Web in local Node server\n++"
	@yarn workspace @ehpr/web start
	@echo "++\n*****"

start-local-services:
	@echo "++\n***** Starting local services\n++"
	@docker-compose up db
	@echo "++\n*****"

stop-local-services:
	@echo "++\n***** Stopping local services\n++"
	@docker-compose down
	@echo "++\n*****"

	
