"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reveni = _interopRequireDefault(require("./reveni"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.reveni = {
  init: function init(orderId, returnId, token, elementSelector) {
    let sandbox = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    return _reveni.default.init(orderId, returnId, elementSelector, token, sandbox);
  },
  close: elementSelector => _reveni.default.close(elementSelector)
};
var _default = {
  init: function init(orderId, returnId, token, elementSelector) {
    let sandbox = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    return _reveni.default.init(orderId, returnId, elementSelector, token, sandbox);
  },
  close: elementSelector => _reveni.default.close(elementSelector)
};
exports.default = _default;