# Contributing

Found a bug? The plugin is not working with your manifest? Want a new
feature? Create an issue, or if you want to take a shot at fixing it
yourself, make a fork, create a pull request, we're always open to
contributions :-)

For larger changes/features, it's usually wise to open an issue before
starting the work, so we can discuss if it's a fit.

## Prerequisites

[npm](https://www.npmjs.com/package/npm) `>= 10` must be installed.

## Installation

- Running `npm install` in the component's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.
