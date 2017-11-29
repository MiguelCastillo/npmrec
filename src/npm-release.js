const Listr = require("listr");
const execa = require("execa");
const util = require("util");
const cpuCount = require("os").cpus().length;

function npmRelease(settings, targets) {
  const listrConfig = targets.map((dirname) => ({
    title: "npm release " + dirname,
    task: (ctx, task) => (
      buildReleaseTasks(ctx, task, settings, { cwd: dirname, stdio: ["pipe", "pipe", "pipe"] })
      //.catch(ex => { throw new Error(`>> npm release ${dirname}\n ${(ex.message ? ex.message : "" + ex)}`) })
    )
  }));

  return new Listr(listrConfig).run();
}

function buildReleaseTasks(ctx, task, settings, procOptions) {
  const message = settings.options.message || "Release v%s";
  const version = settings.input.length ? settings.input[0] : "minor";

  return new Listr([
    { title: "npm version", task: () => execa("npm", ["version", version, "--message", message]) },
    { title: "git push --tags", task: () => execa("git", ["push", "--tags"]) },
    { title: "git push", task: () => execa("git", ["push"]) },
    { title: "npm publish", task: () => execa("npm", ["publish"]) }
  ]);
}

module.exports = npmRelease;
