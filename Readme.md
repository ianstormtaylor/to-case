# to-case

  Simple case detection and conversion for strings.

## Installation

    $ component install ianstormtaylor/to-case
    $ npm install to-case

## Example
    
Case detection:
```js
var Case = require('to-case');

Case('thisIsAString');      // "camel"
Case('This Is A String');   // "capital"
Case('THIS_IS_A_STRING');   // "constant"
Case('this.is.a.string');   // "dot"
Case('this is a string.');  // "lower"
Case('ThisIsAString');      // "pascal"
Case('This is a string.');  // "sentence"
Case('this-is-a-string');   // "slug"
Case('this_is_a_string');   // "snake"
Case('this is a string');   // "space"
Case('This Is a String');   // "title"
Case('THIS IS A STRING');   // "upper"
```

Case conversion:
```js
var to = require('to-case');

to.camel('what_the_heck');     // "whatTheHeck"
to.capital('what the heck');   // "What The Heck"
to.constant('whatTheHeck');    // "WHAT_THE_HECK"
to.dot('whatTheHeck');         // "what.the.heck"
to.inverse('whaT tHe HeCK');   // "WHAt ThE HeCK"
to.lower('whatTheHeck');       // "what the heck"
to.pascal('what.the.heck');    // "WhatTheHeck"
to.sentence('WHAT THE HECK.'); // "What the heck."
to.slug('whatTheHeck');        // "what-the-heck"
to.snake('whatTheHeck');       // "what_the_heck"
to.space('what.the.heck');     // "what the heck"
to.title('what the heck');     // "What the Heck"
to.upper('whatTheHeck');       // "WHAT THE HECK"
```

## API

### Case(string)

  Determine the case of a `string`.
  
### Case[case]\(string\)

  Convert a `string` to a `case`.

### Case.add(name, converter)

  Add a case with the given `name` and a `converter` function.

## License

  MIT
