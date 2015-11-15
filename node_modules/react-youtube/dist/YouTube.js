/**
 * Module dependencies
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _randomGlobal = require('random-global');

var _randomGlobal2 = _interopRequireDefault(_randomGlobal);

var _randomString = require('random-string');

var _randomString2 = _interopRequireDefault(_randomString);

var _libCreatePlayer = require('./lib/createPlayer');

var _libCreatePlayer2 = _interopRequireDefault(_libCreatePlayer);

/**
 * Create a new `YouTube` component.
 */

var YouTube = (function (_React$Component) {
  _inherits(YouTube, _React$Component);

  _createClass(YouTube, null, [{
    key: 'propTypes',
    value: {
      // changing the url will cause a new player to be loaded
      url: _react2['default'].PropTypes.string.isRequired,

      // custom ID for player element
      id: _react2['default'].PropTypes.string,

      // custom class name for player element
      className: _react2['default'].PropTypes.string,

      // https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
      opts: _react2['default'].PropTypes.object,

      // event subscriptions
      onReady: _react2['default'].PropTypes.func,
      onError: _react2['default'].PropTypes.func,
      onPlay: _react2['default'].PropTypes.func,
      onPause: _react2['default'].PropTypes.func,
      onEnd: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      opts: {},
      onReady: function onReady() {},
      onError: function onError() {},
      onPlay: function onPlay() {},
      onPause: function onPause() {},
      onEnd: function onEnd() {}
    },

    /**
     * @param {Object} props
     */

    enumerable: true
  }]);

  function YouTube(props) {
    _classCallCheck(this, YouTube);

    _get(Object.getPrototypeOf(YouTube.prototype), 'constructor', this).call(this, props);

    this._containerId = props.id || (0, _randomString2['default'])();
    this._internalPlayer = null;
    this._playerReadyHandle = null;
    this._playerErrorHandle = null;
    this._stateChangeHandle = null;

    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerError = this.onPlayerError.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  /**
   * Expose `YouTube`
   */

  _createClass(YouTube, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onChangeUrl();
    }

    /**
     * @param {Object} nextProps
     * @returns {Boolean}
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.url !== this.props.url;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.onChangeUrl();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.onReset();
    }
  }, {
    key: 'onChangeUrl',
    value: function onChangeUrl() {
      var _this = this;

      this.onReset();

      (0, _libCreatePlayer2['default'])(this._containerId, this.props, function (player) {
        _this._internalPlayer = player;

        // YT API requires event handlers to be globalized
        _this._playerReadyHandle = (0, _randomGlobal2['default'])(_this.onPlayerReady);
        _this._playerErrorHandle = (0, _randomGlobal2['default'])(_this.onPlayerError);
        _this._stateChangeHandle = (0, _randomGlobal2['default'])(_this.onPlayerStateChange);

        _this._internalPlayer.addEventListener('onReady', _this._playerReadyHandle);
        _this._internalPlayer.addEventListener('onError', _this._playerErrorHandle);
        _this._internalPlayer.addEventListener('onStateChange', _this._stateChangeHandle);
      });
    }
  }, {
    key: 'onReset',
    value: function onReset() {
      if (this._internalPlayer && typeof this._internalPlayer.removeEventListener === 'function') {
        this._internalPlayer.removeEventListener('onReady', this._playerReadyHandle);
        this._internalPlayer.removeEventListener('onError', this._playerErrorHandle);
        this._internalPlayer.removeEventListener('onStateChange', this._stateChangeHandle);

        this._internalPlayer.destroy();

        delete this._playerReadyHandle;
        delete this._playerErrorHandle;
        delete this._stateChangeHandle;
      }
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onReady
     *
     * @param {Object} event
     *   @param {Object} target - player object
     */

  }, {
    key: 'onPlayerReady',
    value: function onPlayerReady(event) {
      this.props.onReady(event);
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onError
     *
     * @param {Object} event
     *   @param {Integer} data  - error type
     *   @param {Object} target - player object
     */

  }, {
    key: 'onPlayerError',
    value: function onPlayerError(event) {
      this.props.onError(event);
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onStateChange
     *
     * @param {Object} event
     *   @param {Integer} data  - status change type
     *   @param {Object} target - actual YT player
     */

  }, {
    key: 'onPlayerStateChange',
    value: function onPlayerStateChange(event) {
      switch (event.data) {

        case window.YT.PlayerState.ENDED:
          this.props.onEnd(event);
          break;

        case window.YT.PlayerState.PLAYING:
          this.props.onPlay(event);
          break;

        case window.YT.PlayerState.PAUSED:
          this.props.onPause(event);
          break;

        default:
          return;
      }
    }

    /**
     * @returns Object
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', { id: this._containerId, className: this.props.className || '' });
    }
  }]);

  return YouTube;
})(_react2['default'].Component);

exports['default'] = YouTube;
module.exports = exports['default'];