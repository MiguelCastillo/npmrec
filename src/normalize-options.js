function toKielbasa(input) {
  return input.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
}

module.exports = function normalizeOptions(options) {
  return Object
    .keys(options)
    .map(key => ["--" + toKielbasa(key), options[key]])
    .reduce((item, next) => item.concat(next), []);
};
