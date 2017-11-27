#!/usr/bin/env node

const utils = require("belty");
const npmExec = require("../src/npm-exec");
const settings = require("./cli-options")(process.argv.slice(2));
const findPackages = require("../src/find-packages");
const targets = settings.options.deep ? findPackages.fullPath() : [process.cwd()];

npmExec(utils.omit(settings, ["options.deep"]), targets)
  .then(() => console.log("All set"))
  .catch((ex) => {
    ex.errors.forEach(error => {
      console.error("\n" + error.message);
    });
  });
