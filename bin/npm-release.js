#!/usr/bin/env node

const utils = require("belty");
const npmRelease = require("../src/npm-release");
const findPackages = require("../src/find-packages");
const path = require("path");

const settings = require("./cli-options")(process.argv.slice(2), {
  alias: {
    message: ["m"],
    deep: ["d"],
    version: ["v"]
  }
});

const targets = settings.options.deep ? findPackages.fullPath() : [process.cwd()];

if (settings.options.version && !settings.input.length) {
  settings.input.push(settings.options.version);
  delete settings.options.version;
}

npmRelease(utils.omit(settings, ["options.deep"]), targets)
  .then(() => console.log("All set"))
  .catch((ex) => console.error("\n" + ex.message));
