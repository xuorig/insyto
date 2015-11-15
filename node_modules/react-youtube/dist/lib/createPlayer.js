/**
 * Module dependencies
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getYoutubeId = require('get-youtube-id');

var _getYoutubeId2 = _interopRequireDefault(_getYoutubeId);

/**
 * Create a new `player` by requesting and using the YouTube Iframe API
 *
 * @param {String} containerId - id of div container
 * @param {Object} props
 *   @param {String} url - url to be loaded
 *   @param {Object} playerVars - https://developers.google.com/youtube/player_parameters
 *
 * @param {Function} cb
 */

var createPlayer = function createPlayer(containerId, props, cb) {
  var YouTubeIframeLoader = require('youtube-iframe');
  var params = _extends({}, props.opts, { videoId: (0, _getYoutubeId2['default'])(props.url) });
  return YouTubeIframeLoader.load(function (YT) {
    return cb(new YT.Player(containerId, params));
  });
};

/**
 * Expose `createPlayer`
 */

exports['default'] = createPlayer;
module.exports = exports['default'];