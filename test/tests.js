describe('case', function () {

var assert = require('assert');
var kase = require('case');

var cases = {
  camel    : 'thisIsAString',
  capital  : 'This Is A String',
  constant : 'THIS_IS_A_STRING',
  dot      : 'this.is.a.string',
  pascal   : 'ThisIsAString',
  sentence : 'This is a string',
  slug     : 'this-is-a-string',
  snake    : 'this_is_a_string',
  space    : 'this is a string',
  title    : 'This Is a String',
  upper    : 'THIS IS A STRING'
};

function determine (key) {
  it('should determine ' + key + ' case', function () {
    assert(key == kase(cases[key]));
  });
}

function method (key) {
  describe('#' + key, function () {
    for (var other in cases) if (key != other) convert(key, other);
  });
}

function convert (key, other) {
  it('should convert ' + other + ' case', function () {
    assert(cases[key] == kase[key](cases[other]));
  });
}

describe('case', function () {
  for (var key in cases) determine(key, cases[key]);
});

for (var key in cases) method(key);

});