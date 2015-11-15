/**
 * Module dependencies
 */

var randomize = require('random-string');

/**
 * Expose `globalize`
 */

module.exports = globalize;

/**
 * Expose some variable onto the global namespace under
 * a randomly generated string, then return that alias.
 *
 * @param {*} variable to be exposed
 * @returns {String}
 */

function globalize(variable) {
  var alias = randomize();
  window[alias] = variable;
  return alias;
}
