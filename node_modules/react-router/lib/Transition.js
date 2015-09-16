"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transition = (function () {
  function Transition() {
    _classCallCheck(this, Transition);

    this.isCancelled = false;
    this.redirectInfo = null;
    this.abortReason = null;
  }

  Transition.prototype.to = function to(pathname, query, state) {
    this.redirectInfo = { pathname: pathname, query: query, state: state };
    this.isCancelled = true;
  };

  Transition.prototype.abort = function abort(reason) {
    this.abortReason = reason;
    this.isCancelled = true;
  };

  return Transition;
})();

exports["default"] = Transition;
module.exports = exports["default"];