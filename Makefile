.PHONY: install, dev-app, dev-api, clean, build, test, lint

TMPDIR := $(shell echo $${TMPDIR:-/tmp})

install-%: SHELL := /bin/bash
install-%:
	@echo "Installing $* dependencies..."
	(cd ./$* && pnpm install);

install: install-app install-api

dev-api: SHELL := /bin/bash
dev-api: install-api
dev-api:
	@echo "Running api in development mode..."
	@(cd ./api && pnpm dev);

dev-app: SHELL := /bin/bash
dev-app: install-app
dev-app:
	@echo "Running app in development mode..."
	@rm -rf $(TMPDIR)/embroider/
	@(cd ./app && pnpm dev);

dev: SHELL := /bin/bash
dev: install
dev:
	@rm -rf $(TMPDIR)/embroider/
	@make -j 2 dev-api dev-app

build-%: SHELL := /bin/bash
build-%: install-%
build-%:
	@echo "Building $*..."
	@(cd ./$* && pnpm build);

build: SHELL := /bin/bash
build: install
build:
	@echo "Building app..."
	@make -j 2 build-api build-app

test: SHELL := /bin/bash
test: install-app
test:
	@echo "Running ember tests..."
	@(cd ./app && pnpm test);

test-api: SHELL := /bin/bash
test-api: install-api
test-api:
	@echo "Running api tests..."
	@(cd ./api && pnpm test);

clean-%: SHELL := /bin/bash
clean-%:
	rm -rf ./$*/node_modules
	rm -rf ./$*/dist
	rm -rf ./$*/tmp
	rm -rf ./$*/build

clean:
	@echo "Cleaning up..."
	@make clean-app
	@make clean-api
