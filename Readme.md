
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

case.camel('what_the_heck');    // "whatTheHeck"
case.capital('what the heck');  // "What The Heck"
case.constant('whatTheHeck');   // "WHAT_THE_HECK"
case.dot('whatTheHeck');        // "what.the.heck"
case.inverse('whaT tHe HeCK');  // "WHAt ThE HeCK"
case.lower('whatTheHeck');      // "what the heck"
case.sentence('whatTheHeck');   // "what.the.heck"
case.slug('whatTheHeck');       // "what-the-heck"
case.snake('whatTheHeck');      // "what_the_heck"
case.space('what.the.heck');    // "what the heck"
case.title('what the heck');    // "What the Heck"
case.upper('whatTheHeck');      // "WHAT THE HECK"
```

## License

  MIT
