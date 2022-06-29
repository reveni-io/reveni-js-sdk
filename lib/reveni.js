"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

const close = elementSelector => {
  const element = (0, _helpers.getElement)(elementSelector);
  element.innerHTML = '';
};

const init = (orderId, returnId, elementSelector, token) => {
  let scripts = document.getElementsByTagName('script');
  let index = scripts.length - 1;
  let myScript = scripts[index];
  const queryParams = (0, _helpers.getQueryParams)(myScript);
  if (!orderId) orderId = queryParams.orderId;
  if (!returnId) returnId = queryParams.returnId;
  if (!elementSelector) elementSelector = queryParams.elementSelector;
  if (!token) token = queryParams.token;
  (0, _helpers.validateInitParams)(orderId, returnId, elementSelector);
  const url = (0, _helpers.generateUrl)(orderId, returnId, token);
  const iframe = (0, _helpers.getIframe)(url);
  const element = (0, _helpers.getElement)(elementSelector);
  element.innerHTML = iframe;
  window.addEventListener('message', e => {
    if (e.data === 'reveni.close') {
      close(elementSelector);
    }
  });
};

var _default = {
  init,
  close
};
exports.default = _default;