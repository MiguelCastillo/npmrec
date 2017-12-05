#!/usr/bin/env node

const utils = require("belty");
const npmPkg = require("../src/npm-pkg");
const findPackages = require("../src/find-packages");

const settings = require("./cli-options")(process.argv.slice(2), {
  alias: {
    deep: ["d"]
  }
});

const targets = settings.options.deep ? findPackages.fullPath() : [process.cwd()];

npmPkg({ fields: settings.input }, targets).catch((ex) => console.error("\n" + ex.message));
