<div align="center">
  <h1>minBin</h1>
  <p>Minimal & self-hostable pastebin alternative, intended for code or short text snippets </p>
  <img src="https://user-images.githubusercontent.com/34040324/209887375-98aa07b0-8e10-497a-91f0-9ebd08931dae.png" width="48%" /> <img src="https://user-images.githubusercontent.com/34040324/209887352-99272ab1-e63d-4e0c-89f4-50e65a40eaa5.png" width="48%" />
</div>

## Prerequisites

You'll need the following properly installed on your system:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (w/ yarn)
* [Ember CLI](https://cli.emberjs.com/release/)

## Installing

* `git clone git@github.com:kiosion/minbin.git` this repository
* `cd minbin`
* `make install` to install deps for both frontend app and api

## Running / Development

* `make dev-{api,app}` (development servers)
* View the app at [http://localhost:4200](http://localhost:4200).
* View the tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `make test`

### Linting

* `make lint`
* `make lint-fix`

### Building

* `make build-{api,app}` (production webpack'd versions)

## Deploying

* `docker-compose build --no-cache` to build fresh docker containers
* `docker-compose up -d` to run the containers in the background
* API will be available at localhost:3000, frontend at localhost:4200. These can then be proxied to a domain of your choice.

## Contributing

Contributions are welcome! Please open an issue or PR if you have any suggestions or find any bugs.

## License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for details.
