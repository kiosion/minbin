<div align="center">
  <h1>minBin</h1>
  <p>A minimal & self-hostable alternative to pastebin, intended for code or text snippets</p>
</div>

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with yarn)
* [Ember CLI](https://cli.emberjs.com/release/)

## Installation

* `git clone git@github.com:kiosion/minbin.git` this repository
* `cd minbin`
* `make install` to install deps for both frontend and backend
* `make dev` to start both dev servers

## Running / Development

* `make dev-{api,app}` (livereload development servers)
* View the app at [http://localhost:4200](http://localhost:4200).
* View the tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `make test`

### Linting

* `make lint`
* `make lint-fix`

### Building

* `make build-{api,app}` (production webpack'd versions)
