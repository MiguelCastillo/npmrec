const Listr = require("listr");
const execa = require("execa");
const glob = require("glob");
const path = require("path");
const util = require("util");

function npmExec(command, options) {
  command = command || "install";
  var argv = [command].concat(parseOptions(options || {}));

  var listrConfig = glob
    .sync(path.join(process.cwd(), "*/**/package.json"), { ignore: "**/node_modules/**" })
    .map((filePath) => path.dirname(filePath))
    .map((dirname) => ({
      title: "npm " + command + " " + dirname,
      task: () => (
        execa("npm", argv, { cwd: dirname, stdio: ["pipe", "pipe", "pipe"] })
        .catch(ex => { throw new Error(">> npm " + command + " " + dirname + "\n" + ex.message) })
      )
    }));

  return new Listr(listrConfig, { concurrent: 5, exitOnError: false }).run();
}

function parseOptions(options) {
  var result = Object
    .keys(options)
    .filter(key => key !== "files")
    .map(key => key[0] === "-" ? [key, options[key]] : ["--" + toKielbasa(key), options[key]])
    .reduce((item, next) => item.concat(next), options.files || []);

  return result;
}

function toKielbasa(input) {
  return input.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
}

module.exports = npmExec;
