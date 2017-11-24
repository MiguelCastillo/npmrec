# npm-extras

npm cli helper.


# This is work in progress.

## Install

```
$ npm install npm-extras -g
```


## CLI

### npm-deep

Command to run npm commands in sub directories that contain package.json files. If no arguments are specified then it just runs `npm install`.

> All commands are executed concurrently.


#### run "npm install"

```
$ npm-deep install
```

#### run "npm update"

```
$ npm-deep update
```

#### run an npm script called build

```
$ npm-deep run build
```

#### install a couple of modules in all sub directories as dev dependencies

```
$ npm-deep install bit-bundler eslint --save-dev
```
