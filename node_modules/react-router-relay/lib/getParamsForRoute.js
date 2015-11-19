'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = getParamsForRoute;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _reactRouterLibGetRouteParams = require('react-router/lib/getRouteParams');

var _reactRouterLibGetRouteParams2 = _interopRequireDefault(_reactRouterLibGetRouteParams);

function getLocationParams(paramNames, paramSource) {
  if (!paramNames) {
    return null;
  }

  var paramsForRoute = {};
  paramNames.forEach(function (name) {
    var param = paramSource ? paramSource[name] : null;
    paramsForRoute[name] = param !== undefined ? param : null;
  });

  return paramsForRoute;
}

function getParamsForRoute(_ref2) {
  var route = _ref2.route;
  var routes = _ref2.routes;
  var params = _ref2.params;
  var location = _ref2.location;

  var paramsForRoute = {};

  // Extract route params for current route and all ancestors.
  for (var _iterator = routes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var ancestorRoute = _ref;

    _Object$assign(paramsForRoute, _reactRouterLibGetRouteParams2['default'](ancestorRoute, params));
    if (ancestorRoute === route) {
      break;
    }
  }

  _Object$assign(paramsForRoute, getLocationParams(route.queryParams, location.query), getLocationParams(route.stateParams, location.state));

  var prepareParams = route.prepareParams;

  if (prepareParams) {
    !(typeof prepareParams === 'function') ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'react-router-relay: Expected `prepareParams` to be a function.') : _invariant2['default'](false) : undefined;
    paramsForRoute = prepareParams(paramsForRoute, route);
    !(typeof paramsForRoute === 'object' && paramsForRoute !== null) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'react-router-relay: Expected `prepareParams` to return an object.') : _invariant2['default'](false) : undefined;
  }

  return paramsForRoute;
}

module.exports = exports['default'];