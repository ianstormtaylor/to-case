
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("ianstormtaylor-to-camel-case/index.js", Function("exports, require, module",
"\n\
var toSpace = require('to-space-case');\n\
\n\
\n\
/**\n\
 * Expose `toCamelCase`.\n\
 */\n\
\n\
module.exports = toCamelCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to camel case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toCamelCase (string) {\n\
  return toSpace(string).replace(/\\s(\\w)/g, function (matches, letter) {\n\
    return letter.toUpperCase();\n\
  });\n\
}//@ sourceURL=ianstormtaylor-to-camel-case/index.js"
));
require.register("ianstormtaylor-to-capital-case/index.js", Function("exports, require, module",
"\n\
var clean = require('to-no-case');\n\
\n\
\n\
/**\n\
 * Expose `toCapitalCase`.\n\
 */\n\
\n\
module.exports = toCapitalCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to capital case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toCapitalCase (string) {\n\
  return clean(string).replace(/(^|\\s)(\\w)/g, function (matches, previous, letter) {\n\
    return previous + letter.toUpperCase();\n\
  });\n\
}//@ sourceURL=ianstormtaylor-to-capital-case/index.js"
));
require.register("ianstormtaylor-to-constant-case/index.js", Function("exports, require, module",
"\n\
var snake = require('to-snake-case');\n\
\n\
\n\
/**\n\
 * Expose `toConstantCase`.\n\
 */\n\
\n\
module.exports = toConstantCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to constant case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toConstantCase (string) {\n\
  return snake(string).toUpperCase();\n\
}//@ sourceURL=ianstormtaylor-to-constant-case/index.js"
));
require.register("ianstormtaylor-to-dot-case/index.js", Function("exports, require, module",
"\n\
var toSpace = require('to-space-case');\n\
\n\
\n\
/**\n\
 * Expose `toDotCase`.\n\
 */\n\
\n\
module.exports = toDotCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to slug case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toDotCase (string) {\n\
  return toSpace(string).replace(/\\s/g, '.');\n\
}//@ sourceURL=ianstormtaylor-to-dot-case/index.js"
));
require.register("ianstormtaylor-to-no-case/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Expose `toNoCase`.\n\
 */\n\
\n\
module.exports = toNoCase;\n\
\n\
\n\
/**\n\
 * Test whether a string is camel-case.\n\
 */\n\
\n\
var hasSpace = /\\s/;\n\
var hasCamel = /[a-z][A-Z]/;\n\
var hasSeparator = /[\\W_]/;\n\
\n\
\n\
/**\n\
 * Remove any starting case from a `string`, like camel or snake, but keep\n\
 * spaces and punctuation that may be important otherwise.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
function toNoCase (string) {\n\
  if (hasSpace.test(string)) return string.toLowerCase();\n\
\n\
  if (hasSeparator.test(string)) string = unseparate(string);\n\
  if (hasCamel.test(string)) string = uncamelize(string);\n\
  return string.toLowerCase();\n\
}\n\
\n\
\n\
/**\n\
 * Separator splitter.\n\
 */\n\
\n\
var separatorSplitter = /[\\W_]+(.|$)/g;\n\
\n\
\n\
/**\n\
 * Un-separate a `string`.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
function unseparate (string) {\n\
  return string.replace(separatorSplitter, function (m, next) {\n\
    return next ? ' ' + next : '';\n\
  });\n\
}\n\
\n\
\n\
/**\n\
 * Camelcase splitter.\n\
 */\n\
\n\
var camelSplitter = /(.)([A-Z]+)/g;\n\
\n\
\n\
/**\n\
 * Un-camelcase a `string`.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
function uncamelize (string) {\n\
  return string.replace(camelSplitter, function (m, previous, uppers) {\n\
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');\n\
  });\n\
}//@ sourceURL=ianstormtaylor-to-no-case/index.js"
));
require.register("ianstormtaylor-to-sentence-case/index.js", Function("exports, require, module",
"\n\
var clean = require('to-no-case');\n\
\n\
\n\
/**\n\
 * Expose `toSentenceCase`.\n\
 */\n\
\n\
module.exports = toSentenceCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to camel case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toSentenceCase (string) {\n\
  return clean(string).replace(/[a-z]/i, function (letter) {\n\
    return letter.toUpperCase();\n\
  });\n\
}//@ sourceURL=ianstormtaylor-to-sentence-case/index.js"
));
require.register("ianstormtaylor-to-slug-case/index.js", Function("exports, require, module",
"\n\
var toSpace = require('to-space-case');\n\
\n\
\n\
/**\n\
 * Expose `toSlugCase`.\n\
 */\n\
\n\
module.exports = toSlugCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to slug case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toSlugCase (string) {\n\
  return toSpace(string).replace(/\\s/g, '-');\n\
}//@ sourceURL=ianstormtaylor-to-slug-case/index.js"
));
require.register("ianstormtaylor-to-snake-case/index.js", Function("exports, require, module",
"var toSpace = require('to-space-case');\n\
\n\
\n\
/**\n\
 * Expose `toSnakeCase`.\n\
 */\n\
\n\
module.exports = toSnakeCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to snake case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toSnakeCase (string) {\n\
  return toSpace(string).replace(/\\s/g, '_');\n\
}\n\
//@ sourceURL=ianstormtaylor-to-snake-case/index.js"
));
require.register("ianstormtaylor-to-space-case/index.js", Function("exports, require, module",
"\n\
var clean = require('to-no-case');\n\
\n\
\n\
/**\n\
 * Expose `toSpaceCase`.\n\
 */\n\
\n\
module.exports = toSpaceCase;\n\
\n\
\n\
/**\n\
 * Convert a `string` to space case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toSpaceCase (string) {\n\
  return clean(string).replace(/[\\W_]+(.|$)/g, function (matches, match) {\n\
    return match ? ' ' + match : '';\n\
  });\n\
}//@ sourceURL=ianstormtaylor-to-space-case/index.js"
));
require.register("component-escape-regexp/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Escape regexp special characters in `str`.\n\
 *\n\
 * @param {String} str\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(str){\n\
  return String(str).replace(/([.*+?=^!:${}()|[\\]\\/\\\\])/g, '\\\\$1');\n\
};//@ sourceURL=component-escape-regexp/index.js"
));
require.register("component-to-function/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Expose `toFunction()`.\n\
 */\n\
\n\
module.exports = toFunction;\n\
\n\
/**\n\
 * Convert `obj` to a `Function`.\n\
 *\n\
 * @param {Mixed} obj\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function toFunction(obj) {\n\
  switch ({}.toString.call(obj)) {\n\
    case '[object Object]':\n\
      return objectToFunction(obj);\n\
    case '[object Function]':\n\
      return obj;\n\
    case '[object String]':\n\
      return stringToFunction(obj);\n\
    case '[object RegExp]':\n\
      return regexpToFunction(obj);\n\
    default:\n\
      return defaultToFunction(obj);\n\
  }\n\
}\n\
\n\
/**\n\
 * Default to strict equality.\n\
 *\n\
 * @param {Mixed} val\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function defaultToFunction(val) {\n\
  return function(obj){\n\
    return val === obj;\n\
  }\n\
}\n\
\n\
/**\n\
 * Convert `re` to a function.\n\
 *\n\
 * @param {RegExp} re\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function regexpToFunction(re) {\n\
  return function(obj){\n\
    return re.test(obj);\n\
  }\n\
}\n\
\n\
/**\n\
 * Convert property `str` to a function.\n\
 *\n\
 * @param {String} str\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function stringToFunction(str) {\n\
  // immediate such as \"> 20\"\n\
  if (/^ *\\W+/.test(str)) return new Function('_', 'return _ ' + str);\n\
\n\
  // properties such as \"name.first\" or \"age > 18\"\n\
  return new Function('_', 'return _.' + str);\n\
}\n\
\n\
/**\n\
 * Convert `object` to a function.\n\
 *\n\
 * @param {Object} object\n\
 * @return {Function}\n\
 * @api private\n\
 */\n\
\n\
function objectToFunction(obj) {\n\
  var match = {}\n\
  for (var key in obj) {\n\
    match[key] = typeof obj[key] === 'string'\n\
      ? defaultToFunction(obj[key])\n\
      : toFunction(obj[key])\n\
  }\n\
  return function(val){\n\
    if (typeof val !== 'object') return false;\n\
    for (var key in match) {\n\
      if (!(key in val)) return false;\n\
      if (!match[key](val[key])) return false;\n\
    }\n\
    return true;\n\
  }\n\
}\n\
//@ sourceURL=component-to-function/index.js"
));
require.register("component-type/index.js", Function("exports, require, module",
"\n\
/**\n\
 * toString ref.\n\
 */\n\
\n\
var toString = Object.prototype.toString;\n\
\n\
/**\n\
 * Return the type of `val`.\n\
 *\n\
 * @param {Mixed} val\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(val){\n\
  switch (toString.call(val)) {\n\
    case '[object Function]': return 'function';\n\
    case '[object Date]': return 'date';\n\
    case '[object RegExp]': return 'regexp';\n\
    case '[object Arguments]': return 'arguments';\n\
    case '[object Array]': return 'array';\n\
    case '[object String]': return 'string';\n\
  }\n\
\n\
  if (val === null) return 'null';\n\
  if (val === undefined) return 'undefined';\n\
  if (val && val.nodeType === 1) return 'element';\n\
  if (val === Object(val)) return 'object';\n\
\n\
  return typeof val;\n\
};\n\
//@ sourceURL=component-type/index.js"
));
require.register("component-each/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var toFunction = require('to-function');\n\
var type;\n\
\n\
try {\n\
  type = require('type-component');\n\
} catch (e) {\n\
  type = require('type');\n\
}\n\
\n\
/**\n\
 * HOP reference.\n\
 */\n\
\n\
var has = Object.prototype.hasOwnProperty;\n\
\n\
/**\n\
 * Iterate the given `obj` and invoke `fn(val, i)`.\n\
 *\n\
 * @param {String|Array|Object} obj\n\
 * @param {Function} fn\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(obj, fn){\n\
  fn = toFunction(fn);\n\
  switch (type(obj)) {\n\
    case 'array':\n\
      return array(obj, fn);\n\
    case 'object':\n\
      if ('number' == typeof obj.length) return array(obj, fn);\n\
      return object(obj, fn);\n\
    case 'string':\n\
      return string(obj, fn);\n\
  }\n\
};\n\
\n\
/**\n\
 * Iterate string chars.\n\
 *\n\
 * @param {String} obj\n\
 * @param {Function} fn\n\
 * @api private\n\
 */\n\
\n\
function string(obj, fn) {\n\
  for (var i = 0; i < obj.length; ++i) {\n\
    fn(obj.charAt(i), i);\n\
  }\n\
}\n\
\n\
/**\n\
 * Iterate object keys.\n\
 *\n\
 * @param {Object} obj\n\
 * @param {Function} fn\n\
 * @api private\n\
 */\n\
\n\
function object(obj, fn) {\n\
  for (var key in obj) {\n\
    if (has.call(obj, key)) {\n\
      fn(key, obj[key]);\n\
    }\n\
  }\n\
}\n\
\n\
/**\n\
 * Iterate array-ish.\n\
 *\n\
 * @param {Array|Object} obj\n\
 * @param {Function} fn\n\
 * @api private\n\
 */\n\
\n\
function array(obj, fn) {\n\
  for (var i = 0; i < obj.length; ++i) {\n\
    fn(obj[i], i);\n\
  }\n\
}\n\
//@ sourceURL=component-each/index.js"
));
require.register("ianstormtaylor-map/index.js", Function("exports, require, module",
"\n\
var each = require('each');\n\
\n\
\n\
/**\n\
 * Map an array or object.\n\
 *\n\
 * @param {Array|Object} obj\n\
 * @param {Function} iterator\n\
 * @return {Mixed}\n\
 */\n\
\n\
module.exports = function map (obj, iterator) {\n\
  var arr = [];\n\
  each(obj, function (o) {\n\
    arr.push(iterator.apply(null, arguments));\n\
  });\n\
  return arr;\n\
};//@ sourceURL=ianstormtaylor-map/index.js"
));
require.register("ianstormtaylor-title-case-minors/index.js", Function("exports, require, module",
"\n\
module.exports = [\n\
  'a',\n\
  'an',\n\
  'and',\n\
  'as',\n\
  'at',\n\
  'but',\n\
  'by',\n\
  'en',\n\
  'for',\n\
  'from',\n\
  'how',\n\
  'if',\n\
  'in',\n\
  'neither',\n\
  'nor',\n\
  'of',\n\
  'on',\n\
  'only',\n\
  'onto',\n\
  'out',\n\
  'or',\n\
  'per',\n\
  'so',\n\
  'than',\n\
  'that',\n\
  'the',\n\
  'to',\n\
  'until',\n\
  'up',\n\
  'upon',\n\
  'v',\n\
  'v.',\n\
  'versus',\n\
  'vs',\n\
  'vs.',\n\
  'via',\n\
  'when',\n\
  'with',\n\
  'without',\n\
  'yet'\n\
];//@ sourceURL=ianstormtaylor-title-case-minors/index.js"
));
require.register("ianstormtaylor-to-title-case/index.js", Function("exports, require, module",
"\n\
var capital = require('to-capital-case')\n\
  , escape = require('escape-regexp')\n\
  , map = require('map')\n\
  , minors = require('title-case-minors');\n\
\n\
\n\
/**\n\
 * Expose `toTitleCase`.\n\
 */\n\
\n\
module.exports = toTitleCase;\n\
\n\
\n\
/**\n\
 * Minors.\n\
 */\n\
\n\
var escaped = map(minors, escape);\n\
var minorMatcher = new RegExp('[^^]\\\\b(' + escaped.join('|') + ')\\\\b', 'ig');\n\
var colonMatcher = /:\\s*(\\w)/g;\n\
\n\
\n\
/**\n\
 * Convert a `string` to camel case.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
\n\
function toTitleCase (string) {\n\
  return capital(string)\n\
    .replace(minorMatcher, function (minor) {\n\
      return minor.toLowerCase();\n\
    })\n\
    .replace(colonMatcher, function (letter) {\n\
      return letter.toUpperCase();\n\
    });\n\
}//@ sourceURL=ianstormtaylor-to-title-case/index.js"
));
require.register("component-stack/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Expose `stack()`.\n\
 */\n\
\n\
module.exports = stack;\n\
\n\
/**\n\
 * Return the stack.\n\
 *\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
function stack() {\n\
  var orig = Error.prepareStackTrace;\n\
  Error.prepareStackTrace = function(_, stack){ return stack; };\n\
  var err = new Error;\n\
  Error.captureStackTrace(err, arguments.callee);\n\
  var stack = err.stack;\n\
  Error.prepareStackTrace = orig;\n\
  return stack;\n\
}//@ sourceURL=component-stack/index.js"
));
require.register("component-assert/index.js", Function("exports, require, module",
"/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var stack = require('stack');\n\
\n\
/**\n\
 * Load contents of `script`.\n\
 *\n\
 * @param {String} script\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
function getScript(script) {\n\
  var xhr = new XMLHttpRequest;\n\
  xhr.open('GET', script, false);\n\
  xhr.send(null);\n\
  return xhr.responseText;\n\
}\n\
\n\
/**\n\
 * Assert `expr` with optional failure `msg`.\n\
 *\n\
 * @param {Mixed} expr\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(expr, msg){\n\
  if (expr) return;\n\
  if (!msg) {\n\
    if (Error.captureStackTrace) {\n\
      var callsite = stack()[1];\n\
      var fn = callsite.getFunctionName();\n\
      var file = callsite.getFileName();\n\
      var line = callsite.getLineNumber() - 1;\n\
      var col = callsite.getColumnNumber() - 1;\n\
      var src = getScript(file);\n\
      line = src.split('\\n\
')[line].slice(col);\n\
      expr = line.match(/assert\\((.*)\\)/)[1].trim();\n\
      msg = expr;\n\
    } else {\n\
      msg = 'assertion failed';\n\
    }\n\
  }\n\
\n\
  throw new Error(msg);\n\
};\n\
//@ sourceURL=component-assert/index.js"
));
require.register("case/lib/index.js", Function("exports, require, module",
"\n\
var cases = require('./cases');\n\
\n\
\n\
/**\n\
 * Expose `determineCase`.\n\
 */\n\
\n\
module.exports = exports = determineCase;\n\
\n\
\n\
/**\n\
 * Determine the case of a `string`.\n\
 *\n\
 * @param {String} string\n\
 * @return {String|Null}\n\
 */\n\
\n\
function determineCase (string) {\n\
  for (var key in cases) {\n\
    if (key == 'none') continue;\n\
    var convert = cases[key];\n\
    if (convert(string) == string) return key;\n\
  }\n\
  return null;\n\
}\n\
\n\
\n\
/**\n\
 * Define a case by `name` with a `convert` function.\n\
 *\n\
 * @param {String} name\n\
 * @param {Object} convert\n\
 */\n\
\n\
exports.add = function (name, convert) {\n\
  exports[name] = cases[name] = convert;\n\
};\n\
\n\
\n\
/**\n\
 * Add all the `cases`.\n\
 */\n\
\n\
for (var key in cases) {\n\
  exports.add(key, cases[key]);\n\
}//@ sourceURL=case/lib/index.js"
));
require.register("case/lib/cases.js", Function("exports, require, module",
"\n\
var camel = require('to-camel-case')\n\
  , capital = require('to-capital-case')\n\
  , constant = require('to-constant-case')\n\
  , dot = require('to-dot-case')\n\
  , no = require('to-no-case')\n\
  , sentence = require('to-sentence-case')\n\
  , slug = require('to-slug-case')\n\
  , snake = require('to-snake-case')\n\
  , space = require('to-space-case')\n\
  , title = require('to-title-case');\n\
\n\
\n\
/**\n\
 * Camel.\n\
 */\n\
\n\
exports.camel = camel;\n\
\n\
\n\
/**\n\
 * Dot. Should precede lowercase.\n\
 */\n\
\n\
exports.dot = dot;\n\
\n\
\n\
/**\n\
 * Slug. Should precede lowercase.\n\
 */\n\
\n\
exports.slug = slug;\n\
\n\
\n\
/**\n\
 * Snake. Should precede lowercase.\n\
 */\n\
\n\
exports.snake = snake;\n\
\n\
\n\
/**\n\
 * Space. Should precede lowercase.\n\
 */\n\
\n\
exports.space = space;\n\
\n\
\n\
/**\n\
 * Constant. Should precede uppercase.\n\
 */\n\
\n\
exports.constant = constant;\n\
\n\
\n\
/**\n\
 * Capital. Should precede sentence and title.\n\
 */\n\
\n\
exports.capital = capital;\n\
\n\
\n\
/**\n\
 * Title.\n\
 */\n\
\n\
exports.title = title;\n\
\n\
\n\
/**\n\
 * Sentence.\n\
 */\n\
\n\
exports.sentence = sentence;\n\
\n\
\n\
/**\n\
 * Convert a `string` to lower case from camel, slug, etc. Different that the\n\
 * usual `toLowerCase` in that it will try to break apart the input first.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
exports.lower = function (string) {\n\
  return no(string).toLowerCase();\n\
};\n\
\n\
\n\
/**\n\
 * Convert a `string` to upper case from camel, slug, etc. Different that the\n\
 * usual `toUpperCase` in that it will try to break apart the input first.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
exports.upper = function (string) {\n\
  return no(string).toUpperCase();\n\
};\n\
\n\
\n\
/**\n\
 * Invert each character in a `string` from upper to lower and vice versa.\n\
 *\n\
 * @param {String} string\n\
 * @return {String}\n\
 */\n\
\n\
exports.inverse = function (string) {\n\
  for (var i = 0, char; char = string[i]; i++) {\n\
    if (!/[a-z]/i.test(char)) continue;\n\
    var upper = char.toUpperCase();\n\
    var lower = char.toLowerCase();\n\
    string[i] = char == upper ? lower : upper;\n\
  }\n\
  return string;\n\
};\n\
\n\
\n\
/**\n\
 * None.\n\
 */\n\
\n\
exports.none = no;//@ sourceURL=case/lib/cases.js"
));














require.alias("ianstormtaylor-to-camel-case/index.js", "case/deps/to-camel-case/index.js");
require.alias("ianstormtaylor-to-camel-case/index.js", "to-camel-case/index.js");
require.alias("ianstormtaylor-to-space-case/index.js", "ianstormtaylor-to-camel-case/deps/to-space-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-space-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-capital-case/index.js", "case/deps/to-capital-case/index.js");
require.alias("ianstormtaylor-to-capital-case/index.js", "to-capital-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-capital-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-constant-case/index.js", "case/deps/to-constant-case/index.js");
require.alias("ianstormtaylor-to-constant-case/index.js", "to-constant-case/index.js");
require.alias("ianstormtaylor-to-snake-case/index.js", "ianstormtaylor-to-constant-case/deps/to-snake-case/index.js");
require.alias("ianstormtaylor-to-space-case/index.js", "ianstormtaylor-to-snake-case/deps/to-space-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-space-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-dot-case/index.js", "case/deps/to-dot-case/index.js");
require.alias("ianstormtaylor-to-dot-case/index.js", "to-dot-case/index.js");
require.alias("ianstormtaylor-to-space-case/index.js", "ianstormtaylor-to-dot-case/deps/to-space-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-space-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-no-case/index.js", "case/deps/to-no-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "to-no-case/index.js");

require.alias("ianstormtaylor-to-sentence-case/index.js", "case/deps/to-sentence-case/index.js");
require.alias("ianstormtaylor-to-sentence-case/index.js", "to-sentence-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-sentence-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-slug-case/index.js", "case/deps/to-slug-case/index.js");
require.alias("ianstormtaylor-to-slug-case/index.js", "to-slug-case/index.js");
require.alias("ianstormtaylor-to-space-case/index.js", "ianstormtaylor-to-slug-case/deps/to-space-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-space-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-snake-case/index.js", "case/deps/to-snake-case/index.js");
require.alias("ianstormtaylor-to-snake-case/index.js", "to-snake-case/index.js");
require.alias("ianstormtaylor-to-space-case/index.js", "ianstormtaylor-to-snake-case/deps/to-space-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-space-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-space-case/index.js", "case/deps/to-space-case/index.js");
require.alias("ianstormtaylor-to-space-case/index.js", "to-space-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-space-case/deps/to-no-case/index.js");

require.alias("ianstormtaylor-to-title-case/index.js", "case/deps/to-title-case/index.js");
require.alias("ianstormtaylor-to-title-case/index.js", "to-title-case/index.js");
require.alias("component-escape-regexp/index.js", "ianstormtaylor-to-title-case/deps/escape-regexp/index.js");

require.alias("ianstormtaylor-map/index.js", "ianstormtaylor-to-title-case/deps/map/index.js");
require.alias("component-each/index.js", "ianstormtaylor-map/deps/each/index.js");
require.alias("component-to-function/index.js", "component-each/deps/to-function/index.js");

require.alias("component-type/index.js", "component-each/deps/type/index.js");

require.alias("ianstormtaylor-title-case-minors/index.js", "ianstormtaylor-to-title-case/deps/title-case-minors/index.js");

require.alias("ianstormtaylor-to-capital-case/index.js", "ianstormtaylor-to-title-case/deps/to-capital-case/index.js");
require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-capital-case/deps/to-no-case/index.js");

require.alias("component-assert/index.js", "case/deps/assert/index.js");
require.alias("component-assert/index.js", "assert/index.js");
require.alias("component-stack/index.js", "component-assert/deps/stack/index.js");

require.alias("case/lib/index.js", "case/index.js");