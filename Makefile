.PHONY: install, dev-app, dev-api, clean, build, test, lint

TMPDIR := $(shell echo $${TMPDIR:-/tmp})

install-%: SHELL := /bin/bash
	@echo "Installing $* dependencies..."
	(cd ./$* && yarn install);

install: install-app install-api

dev-api: SHELL := /bin/bash
dev-api: install-api
	@echo "Running api in development mode..."
	@(cd ./api && yarn dev);

dev-app: SHELL := /bin/bash
dev-app: install-app
	@echo "Running app in development mode..."
	@rm -rf $(TMPDIR)/embroider/
	@(cd ./app && yarn dev);

dev: SHELL := /bin/bash
dev: install
	@rm -rf $(TMPDIR)/embroider/
	@make -j 2 dev-api dev-app

test: SHELL := /bin/bash
test: install-app
	@echo "Running ember tests..."
	@(cd ./app && yarn test);

test-api: SHELL := /bin/bash
test-api: install-api
	@echo "Running api tests..."
	@(cd ./api && yarn test);

clean-%: SHELL := /bin/bash
	rm -rf ./$*/node_modules
	rm -rf ./$*/dist
	rm -rf ./$*/tmp
	rm -rf ./$*/yarn-error.log
	rm -rf ./$*/build

clean:
	@echo "Cleaning up..."
	@make clean-app
	@make clean-api
