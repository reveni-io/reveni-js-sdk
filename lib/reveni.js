"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _helpers = require("./helpers");

const close = (elementSelector, redirectUrl, returnStatus, callbacks) => {
  const element = (0, _helpers.getElement)(elementSelector);
  element.innerHTML = '';
  if (callbacks !== null && callbacks !== void 0 && callbacks.onFinish) callbacks === null || callbacks === void 0 ? void 0 : callbacks.onFinish(returnStatus);
  (0, _helpers.executeCallbackOrRedirect)(returnStatus, redirectUrl, callbacks);
};

const init = function init(orderId, returnId, elementSelector, token, sandbox) {
  let loadedByTag = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  let callbacks = arguments.length > 6 ? arguments[6] : undefined;

  if (loadedByTag) {
    const scriptTags = document.querySelectorAll('script');
    const currentScript = Array.from(scriptTags).find(script => script.src.includes("reveni-js-sdk.js"));
    const queryParams = (0, _helpers.getQueryParams)(currentScript);
    if (!orderId) orderId = queryParams.orderId;
    if (!returnId) returnId = queryParams.returnId;
    if (!elementSelector) elementSelector = queryParams.elementSelector;
    if (!token) token = queryParams.token;
  }

  (0, _helpers.validateInitParams)(orderId, returnId, elementSelector);
  const url = (0, _helpers.generateUrl)(orderId, returnId, token, sandbox);
  const iframe = (0, _helpers.getIframe)(url);
  const element = (0, _helpers.getElement)(elementSelector);
  element.innerHTML = iframe;
  window.addEventListener('message', e => {
    const data = (0, _helpers.parseMessage)(e.data);

    if ((data === null || data === void 0 ? void 0 : data.type) === 'reveni.close') {
      close(elementSelector, data === null || data === void 0 ? void 0 : data.redirectUrl, data === null || data === void 0 ? void 0 : data.status, callbacks);
    }
  });
};

var _default = {
  init,
  close
};
exports.default = _default;