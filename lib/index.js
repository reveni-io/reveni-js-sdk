"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reveni = _interopRequireDefault(require("./reveni"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.reveni = {
  init: (orderId, returnId, token, elementSelector) => _reveni.default.init(orderId, returnId, elementSelector, token),
  close: elementSelector => _reveni.default.close(elementSelector)
};
var _default = {
  init: (orderId, returnId, token, elementSelector) => _reveni.default.init(orderId, returnId, elementSelector, token),
  close: elementSelector => _reveni.default.close(elementSelector)
};
exports.default = _default;