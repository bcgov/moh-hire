# EHPR
# Default Environments
-include ./.env

export $(shell sed 's/=.*//' ./.env)

export NODE_ENV ?= development


.PHONY: build-common watch-common app-local print-env start-local-services

print-env:
	@echo "\n**** ENVIRONMENTS ****\n"
	@echo "\nProject: $(PROJECT)"
	@echo "\nNODE_ENV: $(NODE_ENV)"
	@echo "\n*********************\n"

watch-common: print-env
	@echo "++\n***** Watching All common packages\n++"
	@yarn watch:common

build-common: print-env
	@echo "++\n***** Building All stacks\n++"
	@yarn build-common && yarn


app-local: start-local-services
	@echo "++\n***** Running api + web in local Node server\n++"
	@yarn 
	@yarn start:local
start-local-services:
	@echo "++\n***** Starting local services\n++"
	@docker-compose up -d db 
	@echo "++\n*****"

stop-local-services:
	@echo "++\n***** Stopping local services\n++"
	@docker-compose down
	@echo "++\n*****"

	
