
var assert = require('assert')
var to = require('..')

/**
 * Cases.
 */

var cases = {
  camel: 'thisIsAString',
  capital: 'This Is A String',
  constant: 'THIS_IS_A_STRING',
  dot: 'this.is.a.string',
  pascal: 'ThisIsAString',
  sentence: 'This is a string',
  slug: 'this-is-a-string',
  snake: 'this_is_a_string',
  space: 'this is a string',
  title: 'This Is a String',
  upper: 'THIS IS A STRING'
}

/**
 * Tests.
 */

describe('to-case', function () {

  describe('detection', function () {
    for (var key in cases) determine(key, cases[key])
  })

  describe('conversion', function () {
    for (var key in cases) method(key)

    describe('#inverse', function () {
      it('should invert case', function () {
        assert('tHIS iS A sTRING' == to.inverse('This Is a String'))
      })
    })
  })
})

/**
 * Create a determine test for a case of `key`.
 *
 * @param {String} key
 */

function determine(key) {
  it('should determine ' + key + ' case', function () {
    assert(key == to(cases[key]))
  })
}

/**
 * Create a method test group for a method named `key`.
 *
 * @param {String} key
 */

function method(key) {
  describe('#' + key, function () {
    for (var other in cases) if (key != other) convert(key, other)
  })
}

/**
 * Create a conversion test for a case of `key`.
 *
 * @param {String} key
 */

function convert(key, other) {
  it('should convert ' + other + ' case', function () {
    assert(cases[key] == to[key](cases[other]))
  })
}
