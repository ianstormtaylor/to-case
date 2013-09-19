/**
 * Module dependencies.
 */

var stack = require('stack');

/**
 * Load contents of `script`.
 *
 * @param {String} script
 * @return {String}
 * @api private
 */

function getScript(script) {
  var xhr = new XMLHttpRequest;
  xhr.open('GET', script, false);
  xhr.send(null);
  return xhr.responseText;
}

/**
 * Assert `expr` with optional failure `msg`.
 *
 * @param {Mixed} expr
 * @param {String} [msg]
 * @api public
 */

module.exports = function(expr, msg){
  if (expr) return;
  if (!msg) {
    if (Error.captureStackTrace) {
      var callsite = stack()[1];
      var fn = callsite.getFunctionName();
      var file = callsite.getFileName();
      var line = callsite.getLineNumber() - 1;
      var col = callsite.getColumnNumber() - 1;
      var src = getScript(file);
      line = src.split('\n')[line].slice(col);
      expr = line.match(/assert\((.*)\)/)[1].trim();
      msg = expr;
    } else {
      msg = 'assertion failed';
    }
  }

  throw new Error(msg);
};
