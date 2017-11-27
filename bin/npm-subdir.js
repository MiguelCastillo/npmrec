#!/usr/bin/env node

const npmExec = require("../src/npm-exec");
const settings = require("../src/parse-cli-options")(process.argv.slice(2));
const findPackages = require("../src/find-packages");
const targets = findPackages.fullPath().filter(packagePath => process.cwd() !== packagePath);

npmExec(settings, targets)
  .then(() => console.log("All set"))
  .catch((ex) => {
    ex.errors.forEach(error => {
      console.error("\n" + error.message);
    });
  });
