const Listr = require("listr");
const execa = require("execa");
const util = require("util");
const cpuCount = require("os").cpus().length;
const defaultCommand = "install";

function npmExec(settings, targets) {
  const command = settings.command || defaultCommand;

  const listrConfig = targets.map((dirname) => ({
    title: "npm " + command + " " + dirname,
    task: () => (
      execa("npm", buildChildProcessArgv(settings), { cwd: dirname, stdio: ["pipe", "pipe", "pipe"] })
      .catch(ex => { throw new Error(">> npm " + command + " " + dirname + "\n" + (ex.message ? ex.message : "" + ex)) })
    )
  }));

  return new Listr(listrConfig, { concurrent: cpuCount, exitOnError: false }).run();
}

function buildChildProcessArgv(settings) {
  return [settings.command || defaultCommand].concat(settings.input).concat(parseOptions(settings.options || {}));
}

function parseOptions(options) {
  return Object
    .keys(options)
    .map(key => key[0] === "-" ? [key, options[key]] : ["--" + toKielbasa(key), options[key]])
    .reduce((item, next) => item.concat(next), []);
}

function toKielbasa(input) {
  return input.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
}

module.exports = npmExec;
