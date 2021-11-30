# EHPR
# Default Environments
-include ./.env

export $(shell sed 's/=.*//' ./.env)

export NODE_ENV ?= development


.PHONY: app-local print-env start-local-services

print-env:
	@echo "\n**** ENVIRONMENTS ****\n"
	@echo "\nProject: $(PROJECT)"
	@echo "\nNODE_ENV: $(NODE_ENV)"
	@echo "\n*********************\n"

app-local: print-env start-local-services
	@echo "++\n***** Running api + web in local Node server\n++"
	@yarn 
	@yarn start:local
	@echo "\n*********************\n"
start-local-services:
	@echo "++\n***** Starting local services\n++"
	@docker-compose up -d db 
	@echo "++\n*****"

stop-local-services:
	@echo "++\n***** Stopping local services\n++"
	@docker-compose down db
	@echo "++\n*****"

docker-stop:
	@echo "++\n***** Stopping Docker containers\n++"
	@docker-compose down
	@echo "++\n*****"

docker-run:
	@echo "++\n***** Running docker-compose\n++"
	@docker-compose up --build
	@echo "++\n*****"

	
