#!/usr/bin/env node

const npmExec = require("../src/npm-exec");
const findPackages = require("../src/find-packages");
const utils = require("belty");
const argv = require("subarg")(process.argv.slice(2));
const command = argv._.shift();
const files = argv._.slice(0);
const targets = findPackages.fullPath();

npmExec(command, Object.assign({ files: files }, utils.omit(argv, ["_"])), targets)
  .then(() => console.log("All set"))
  .catch((ex) => {
    ex.errors.forEach(error => {
      console.error("\n" + error.message);
    });
  });
