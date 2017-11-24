# npm-extras

npm cli helpers


# This is work in progress.

<img src="https://raw.githubusercontent.com/MiguelCastillo/npm-extras/master/img/npm-deep.gif" width="50%"></img>


## Install

```
$ npm install npm-extras -g
```


## CLI

## npm-deep

Run npm commands in current and sub directories where package.json files exist. If no arguments are specified then npm-deep will runs `npm install`.

> All commands are executed concurrently.

### examples

- run "npm install"

```
$ npm-deep install
```

- run "npm update"

```
$ npm-deep update
```

- run an npm script called build

```
$ npm-deep run build
```

- install a couple of modules in all sub directories as dev dependencies

```
$ npm-deep install bit-bundler eslint --save-dev
```


## npm-subdir

This is just like npm-deep, except that it does not process the package.json in the current directory; only sub directories.
