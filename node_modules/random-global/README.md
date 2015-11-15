random-global
=============================

Expose a variable onto the `window` under a randomized alias.

## Installation

```
$ npm install random-global
```

Usage
-----

```js
var globalize = require('random-global');

var msg = 'yes';
var doesThisWork = globalize(msg);

window[doesThisWork]; // 'yes'
```

# License

  MIT
