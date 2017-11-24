const glob = require("glob");
const path = require("path");

function findPackages() {
  return glob.sync(path.join(process.cwd(), "**/package.json"), { ignore: "**/node_modules/**" });
}

function findPackagesFullPath() {
  return findPackages().map((filePath) => path.dirname(filePath));
}

module.exports = findPackages;
module.exports.fullPath = findPackagesFullPath;
