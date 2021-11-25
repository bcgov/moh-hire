# EHPR
# Default Environments
-include ./.env

export $(shell sed 's/=.*//' ./.env)

export NODE_ENV ?= development


.PHONY: build-local api-local web-local print-env run-local

run-local: | build-local api-local web-local

print-env:
	@echo "\n**** ENVIRONMENT ****\n"
	@echo NODE_ENV=$(NODE_ENV)
	@echo "\n*********************\n"

build-local:
	@echo "++\n***** Building All stacks\n++\n"
	@yarn build

api-local:
	@echo "++\n***** Running API in local Node env\n++"
	@yarn workspace @ehpr/api start:dev:local
	@echo "\n******"

web-local:
	@echo "++\n***** Running Web in local Node server\n ++"
	@yarn workspace @ehpr/web start
	@echo "\n*****"

	
