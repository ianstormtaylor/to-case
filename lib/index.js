
var cases = require('./cases');


/**
 * Expose `determineCase`.
 */

module.exports = exports = determineCase;


/**
 * Determine the case of a `string`.
 *
 * @param {String} string
 * @return {String|Null}
 */

function determineCase (string) {
  for (var key in cases) {
    if (key == 'none') continue;
    var convert = cases[key];
    if (convert(string) == string) return key;
  }
  return null;
}


/**
 * Define a case by `name` with a `convert` function.
 *
 * @param {String} name
 * @param {Object} convert
 */

exports.add = function (name, convert) {
  exports[name] = cases[name] = convert;
};


/**
 * Add all the `cases`.
 */

for (var key in cases) {
  exports.add(key, cases[key]);
}