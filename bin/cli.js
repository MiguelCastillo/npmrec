#!/usr/bin/env node


const npmrec = require("../index");
const argv = require("subarg")(process.argv.slice(2));
const command = argv._.shift();
const files = argv._.slice(0);

// Remove unwanted key.
delete argv._;

npmrec(command, Object.assign({ files: files }, argv))
  .then(() => console.log("All set"))
  .catch((ex) => {
    ex.errors.forEach(error => {
      console.error("\n" + error.message);
    });
  });
