/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayDeprecated
 * @typechecks
 * 
 */

'use strict';

var forEachObject = require('fbjs/lib/forEachObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * @internal
 */
var RelayDeprecated = {

  /**
   * Detects deprecated API usage.
   *
   * TODO(jkassens, #8978552): delete this
   */
  upgradeContainerSpec: function upgradeContainerSpec(spec) {
    ['queries', 'queryParams'].forEach(function (property) {
      !!spec.hasOwnProperty(property) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Relay.createContainer(...): Found no longer supported property: %s', property) : invariant(false) : undefined;
    });
    return spec;
  },

  upgradeRangeBehaviors: function upgradeRangeBehaviors(rangeBehaviors) {
    // Prior to 0.4.1 you would have to specify the args in your range
    // behaviors in the same order they appeared in your query. From 0.4.1
    // onward, args in a range behavior key must be in alphabetical order.
    // What follows is code to produce a deprecation warning in case we
    // encounter a range behavior key that's out of order. We will remove this
    // warning with the 0.5.0 breaking version.
    var rangeBehaviorsWithSortedKeys = {};
    forEachObject(rangeBehaviors, function (value, key) {
      var sortedKey = undefined;
      if (key === '') {
        sortedKey = '';
      } else {
        var keyParts = key
        // Remove the last parenthesis
        .slice(0, -1)
        // Slice on unescaped parentheses followed immediately by a `.`
        .split(/\)\./);
        sortedKey = keyParts.sort().join(').') + (keyParts.length ? ')' : '');
        process.env.NODE_ENV !== 'production' ? warning(sortedKey === key, 'RelayMutation: To define a range behavior key without sorting ' + 'the arguments alphabetically is deprecated as of Relay 0.4.1 and ' + 'will be disallowed in 0.5.0. Please sort the argument names of ' + 'the range behavior key `%s`', key) : undefined;
      }
      rangeBehaviorsWithSortedKeys[sortedKey] = value;
    });
    return rangeBehaviorsWithSortedKeys;
  }

};

module.exports = RelayDeprecated;