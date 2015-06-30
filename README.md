# ES6 SDK browser boilerplate

This boilerplate is intended for the development of third-party SDK's using modern ES6 JavaScript. 
This is a simplified and enhanced version of [babel-library-boilerplate](https://github.com/babel/babel-library-boilerplate)

### Features
* ES6 syntax using [Babel compiler](https://babeljs.io/).
* Code linting with [eslint](http://eslint.org/) and [jscs](http://jscs.info/).
* Builds for browser using [browserify](http://browserify.org/) and [babelify](https://github.com/babel/babelify).
* Code minification and optimization using [UglifyJS2](https://github.com/mishoo/UglifyJS2).
* Unit tests with [mocha](http://mochajs.org/), [chai](http://chaijs.com/) and [sinon](http://sinonjs.org/).
* Code coverage reports for unit tests using [istanbul](https://github.com/gotwarlost/istanbul) and [isparta](https://github.com/douglasduteil/isparta).
* Integration tests with [karma](https://github.com/karma-runner/karma).
* [Gulp](http://gulpjs.com/) task runner.

### Installation Prerequisites
* [NodeJS](https://nodejs.org/download/) or [io.js](https://iojs.org/en/index.html) with npm.
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### Installation
```bash
$ git clone git@github.com:DavidKlassen/es6-browser-boilerplate.git
$ cd es6-browser-boilerplate
$ npm run setup
```

### Available gulp tasks
* `gulp lint` - runs eslint and jscs
* `gulp test:unit` - runs mocha unit tests
* `gulp coverage` - runs unit tests and generates coverage report
* `gulp test:integration` - runs karma tests
* `gulp test` - runs unit and integration tests and generates code coverage report
* `gulp browserify` - builds the script for browser
* `gulp compile` - runs uglify and generates minified script
* `gulp build` - runs browserify and compile
* `gulp` - default task, runs lint, test, build and compile tasks
