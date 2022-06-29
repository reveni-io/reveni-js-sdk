"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _helpers = require("./helpers");

const close = elementSelector => {
  const element = (0, _helpers.getElement)(elementSelector);
  element.innerHTML = '';
};

const init = (orderId, returnId, elementSelector, token, sandbox) => {
  const scriptTags = document.querySelectorAll('script');
  const currentScript = Array.from(scriptTags).find(script => script.src.includes("reveni-js-sdk.js"));
  const queryParams = (0, _helpers.getQueryParams)(currentScript);
  if (!orderId) orderId = queryParams.orderId;
  if (!returnId) returnId = queryParams.returnId;
  if (!elementSelector) elementSelector = queryParams.elementSelector;
  if (!token) token = queryParams.token;
  (0, _helpers.validateInitParams)(orderId, returnId, elementSelector);
  const url = (0, _helpers.generateUrl)(orderId, returnId, token, sandbox);
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