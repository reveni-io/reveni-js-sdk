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
    let onSuccess = arguments.length > 5 ? arguments[5] : undefined;
    let onReject = arguments.length > 6 ? arguments[6] : undefined;
    return _reveni.default.init(orderId, returnId, elementSelector, token, sandbox, true, onSuccess, onReject);
  },
  close: elementSelector => _reveni.default.close(elementSelector)
};
var _default = {
  init: function init(orderId, returnId, token, elementSelector) {
    let sandbox = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    let onSuccess = arguments.length > 5 ? arguments[5] : undefined;
    let onReject = arguments.length > 6 ? arguments[6] : undefined;
    return _reveni.default.init(orderId, returnId, elementSelector, token, sandbox, false, onSuccess, onReject);
  },
  close: elementSelector => _reveni.default.close(elementSelector)
};
exports.default = _default;