.PHONY: build, test, dev, db, clean

db: SHELL:=/bin/bash
db:
	@echo "Starting postgres container..."
	@docker container run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -v minbin-postgres:/var/lib/postgresql/data --rm postgres:11-alpine
