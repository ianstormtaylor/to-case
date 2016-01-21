
# to-case [![Build Status](https://travis-ci.org/ianstormtaylor/to-case.svg?branch=master)](https://travis-ci.org/ianstormtaylor/to-case)

Simple case conversion and detection for strings. Part of the series of case helpers. For the individual libraries see:

- [`to-camel-case`](https://github.com/ianstormtaylor/to-camel-case)
- [`to-constant-case`](https://github.com/ianstormtaylor/to-constant-case)
- [`to-capital-case`](https://github.com/ianstormtaylor/to-capital-case)
- [`to-dot-case`](https://github.com/ianstormtaylor/to-dot-case)
- [`to-no-case`](https://github.com/ianstormtaylor/to-no-case)
- [`to-pascal-case`](https://github.com/ianstormtaylor/to-pascal-case)
- [`to-sentence-case`](https://github.com/ianstormtaylor/to-sentence-case)
- [`to-slug-case`](https://github.com/ianstormtaylor/to-slug-case)
- [`to-snake-case`](https://github.com/ianstormtaylor/to-snake-case)
- [`to-space-case`](https://github.com/ianstormtaylor/to-space-case)
- [`to-title-case`](https://github.com/ianstormtaylor/to-title-case)


## Installation

```
$ npm install to-case
```


## Example

Case conversion:
```js
var to = require('to-case')

to.camel('what_the_heck')      // "whatTheHeck"
to.capital('what the heck')    // "What The Heck"
to.constant('whatTheHeck')     // "WHAT_THE_HECK"
to.dot('whatTheHeck')          // "what.the.heck"
to.inverse('whaT tHe HeCK')    // "WHAt ThE HeCK"
to.lower('whatTheHeck')        // "what the heck"
to.pascal('what.the.heck')     // "WhatTheHeck"
to.sentence('WHAT THE HECK.')  // "What the heck."
to.slug('whatTheHeck')         // "what-the-heck"
to.snake('whatTheHeck')        // "what_the_heck"
to.space('what.the.heck')      // "what the heck"
to.title('what the heck')      // "What the Heck"
to.upper('whatTheHeck')        // "WHAT THE HECK"
```

Case detection:
```js
var to = require('to-case')

to('thisIsAString')      // "camel"
to('This Is A String')   // "capital"
to('THIS_IS_A_STRING')   // "constant"
to('this.is.a.string')   // "dot"
to('this is a string.')  // "lower"
to('ThisIsAString')      // "pascal"
to('This is a string.')  // "sentence"
to('this-is-a-string')   // "slug"
to('this_is_a_string')   // "snake"
to('this is a string')   // "space"
to('This Is a String')   // "title"
to('THIS IS A STRING')   // "upper"
```


## API

### to(string)

Determine the case of a `string`.
  
### to[case]\(string\)

Convert a `string` to a `case`.

### to.add(name, converter)

Add a case with the given `name` and a `converter` function.


## License

The MIT License (MIT)

Copyright &copy; 2016, Ian Storm Taylor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
