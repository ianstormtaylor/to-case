# case

  Simple case detection and conversion for strings.

## Installation

    $ component install ianstormtaylor/case

## Example
    
Case detection:
```js
var Case = require('case');

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
var Case = require('case');

Case.camel('what_the_heck');     // "whatTheHeck"
Case.capital('what the heck');   // "What The Heck"
Case.constant('whatTheHeck');    // "WHAT_THE_HECK"
Case.dot('whatTheHeck');         // "what.the.heck"
Case.inverse('whaT tHe HeCK');   // "WHAt ThE HeCK"
Case.lower('whatTheHeck');       // "what the heck"
Case.pascal('what.the.heck');    // "WhatTheHeck"
Case.sentence('WHAT THE HECK.'); // "What the heck."
Case.slug('whatTheHeck');        // "what-the-heck"
Case.snake('whatTheHeck');       // "what_the_heck"
Case.space('what.the.heck');     // "what the heck"
Case.title('what the heck');     // "What the Heck"
Case.upper('whatTheHeck');       // "WHAT THE HECK"
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
