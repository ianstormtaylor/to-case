
var snake = require('to-snake-case');


/**
 * Expose `toConstantCase`.
 */

module.exports = toConstantCase;


/**
 * Convert a `string` to constant case.
 *
 * @param {String} string
 * @return {String}
 */


function toConstantCase (string) {
  return snake(string).toUpperCase();
}