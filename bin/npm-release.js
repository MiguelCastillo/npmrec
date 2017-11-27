#!/usr/bin/env node

const utils = require("belty");
const npmRelease = require("../src/npm-release");
const findPackages = require("../src/find-packages");
const path = require("path");

const settings = require("./cli-options")(process.argv.slice(2), {
  alias: {
    message: ["m"],
    deep: ["d"]
  }
});

const targets = settings.options.deep ? findPackages.fullPath() : [process.cwd()];

npmRelease(utils.omit(settings, ["options.deep"]), targets)
  .then(() => console.log("All set"))
  .catch((ex) => {
    ex.errors.forEach(error => {
      console.error("\n" + error.message);
    });
  });
