var test = require('tape');
var globalize = require('../');

test('randomglobal', function(t) {
  t.plan(1);
  
  var lyric = '"mayonnaise colored benz, i push miracle whips"';
  var alias = globalize(lyric);

  t.equal(window[alias], lyric, 'variable is globalized under a random alias');
});
