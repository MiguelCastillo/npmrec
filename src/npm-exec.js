const Listr = require("listr");
const execa = require("execa");
const util = require("util");
const cpuCount = require("os").cpus().length;
const normalizeOptions = require("./normalize-options");
const defaultCommand = "install";

function npmExec(settings, targets) {
  if (!settings.input.length) {
    settings.input.push(defaultCommand);
  }

  if (!settings.options) {
    settings.options = {};
  }

  const command = settings.input[0];

  const listrConfig = targets.map((dirname) => ({
    title: "npm " + command + " " + dirname,
    task: () => (
      execa("npm", buildChildProcessArgv(settings), { cwd: dirname, stdio: ["pipe", "pipe", "pipe"] })
      .catch(ex => { throw new Error(`>> npm ${command} ${dirname}\n${(ex.message ? ex.message : "" + ex)}`) })
    )
  }));

  return new Listr(listrConfig, { concurrent: cpuCount, exitOnError: false }).run();
}

function buildChildProcessArgv(settings) {
  return settings.input.concat(normalizeOptions(settings.options));
}

module.exports = npmExec;
