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

Command to run npm commands in sub directories that contain package.json files. If no arguments are specified then it just runs `npm install`.

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
