# npm-extras

[![Greenkeeper badge](https://badges.greenkeeper.io/MiguelCastillo/npm-extras.svg)](https://greenkeeper.io/)

npm cli helpers


# This is work in progress.

<img src="https://raw.githubusercontent.com/MiguelCastillo/npm-extras/master/img/npm-release.gif" width="50%"></img>
<img src="https://raw.githubusercontent.com/MiguelCastillo/npm-extras/master/img/npm-deep.gif" width="50%"></img>


## Install

```
$ npm install npm-extras -g
```


## CLI

## npm-do

Run concurrent npm commands in the current directory. npm-do can be configured to run npm commands in sub directories as well via the options `--deep`. If no arguments are specified then npm-do will runs `npm install`.

### options

- deep. This flag will be used to determine if sub directories should also be processed. Defaults to false.

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

This is just like npm-do except that it will only process sub directories excluding the current directory.

## npm-deep

This is just like npm-do except that it will have the `deep` flag set by default.

## npm-release

This is a helper command that will:

1. Update the package.json version based on the input
2. Create a git tag
3. Push changes related to the release to git, including the tag
4. Publish new version of the npm module to the npm registry

### options

- deep. This flag will be used to determine if sub directories should also be processed. Defaults to false.

- message. This is the message used when creating the git tag.

- version. This is the version for updating the packge.json file. This value is handed off to `npm version`, so it will be helpful to take a look [here](https://docs.npmjs.com/cli/version) for more details. This defaults to "minor".


### examples


- Publishing with all defaults. version is minor and the message is in the format of "Release v%s" where "%s" is the new version generated.

```
$ npm-release
```

- Updating the version to patch

```
$ npm-release patch
```

- Updating the version to major with a tag message

```
$ npm-release major -m "Major update with breaking changes"
```

- Alternatively, you can choose to supply the version as an option

```
$ npm-release --version 3.1.2
```


## npm-pkg

Command to print to console one or more fields from package.json files. `npm-pkg` also supports pacakge.json file in sub directories via the `--deep` flag.

### Examples

- Print the version of the package.json in the current directory.

```
$ npm-pkg version
```

- Print the version of package.json files in the current and sub directories.

```
$ npm-pkg version --deep
```

- Print the name, dependencies, and scripts in the current and sub directories

```
$ npm-pkg name dependencies scripts --deep
```
