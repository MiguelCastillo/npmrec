const utils = require("belty");
const subarg = require("subarg");

function processAlias(alias) {
  return function deepProcess(options) {
    if (options) {
      Object.keys(alias)
        .filter(key => options[key])
        .forEach(key => {
          if (options[key].constructor === Object) {
            deepProcess(options[key]);
          }
          else {
            alias[key].forEach(a => delete options[a]);
          }
        });
    }
  };
}

module.exports = function(args, options) {
  options = options || {};
  const settings = subarg(args, options);
  const input = settings._.slice(0);

  if (options.alias) {
    Object.keys(options.alias).forEach(key => options.alias[key] = [].concat(options.alias[key]));
    processAlias(options.alias)(settings);
  }

  return {
    input: input,
    options: utils.omit(settings, ["_"])
  };
};
