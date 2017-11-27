# npm-extras

npm cli helpers


# This is work in progress.

<img src="https://raw.githubusercontent.com/MiguelCastillo/npm-extras/master/img/npm-deep.gif" width="50%"></img>


## Install

```
$ npm install npm-extras -g
```


## CLI

## npm-do

Run concurrent npm commands in the current directory. npm-do can be configured to run npm commands in sub directories as well via the options `--deep`. If no arguments are specified then npm-do will runs `npm install`.

### examples

All the examples below are passing the `--deep` flag in order to tell npm-do to also process sub directories.

- The following example will run `npm install`.

```
$ npm-do install --deep
```

- run "npm update"

```
$ npm-do update --deep
```

- run an npm script called build

```
$ npm-do run build --deep
```

- install a couple of modules in all sub directories as dev dependencies

```
$ npm-do install bit-bundler eslint --save-dev --deep
```


## npm-subdir

This is just like npm-do, except that it will only process sub directories excluding the current directory.
