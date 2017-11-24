const utils = require("belty");
const subarg = require("subarg");

module.exports = function(options) {
  const settings = subarg(options.slice(2));
  const command = settings._.shift();
  const input = settings._.slice(0);

  return {
    command: command,
    input: input,
    options: utils.omit(settings, ["_"])
  };
};
