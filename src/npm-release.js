const Listr = require("listr");
const execa = require("execa");
const util = require("util");
const cpuCount = require("os").cpus().length;

function npmRelease(settings, targets) {
  const listrConfig = targets.map((dirname) => ({
    title: "npm release " + dirname,
    task: (ctx, task) => buildReleaseTasks(ctx, task, settings, { cwd: dirname, stdio: ["pipe", "pipe", "pipe"] })
  }));

  return new Listr(listrConfig, { concurrent: cpuCount }).run();
}

function buildReleaseTasks(ctx, task, settings, procOptions) {
  const message = settings.options.message || "Release v%s";
  const version = settings.input.length ? settings.input[0] : "minor";
  const errorHandler = ex => { throw new Error(`>> npm release ${procOptions.cwd}\n${(ex.message ? ex.message : "" + ex)}`) };

  return new Listr([
    { title: "npm version", task: () => execa("npm", ["version", version, "--message", message]).catch(errorHandler) },
    { title: "git push --tags", task: () => execa("git", ["push", "--tags"]).catch(errorHandler) },
    { title: "git push", task: () => execa("git", ["push"]).catch(errorHandler) },
    { title: "npm publish", task: () => execa("npm", ["publish"]).catch(errorHandler) }
  ]);
}

module.exports = npmRelease;
