"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParams = exports.validateInitParams = exports.parseMessage = exports.getQueryParams = exports.getIframe = exports.getElement = exports.generateUrl = exports.executeCallbackOrRedirect = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url-search-params.js");

const validateParams = (orderId, returnId) => {
  if (!orderId) throw new Error('Order id cannot be empty');
  if (!returnId) throw new Error('Return id cannot be empty');
};

exports.validateParams = validateParams;

const validateInitParams = (orderId, returnId, elementSelector) => {
  validateParams(orderId, returnId);
  if (!elementSelector) throw new Error('Element selector cannot be empty');
};

exports.validateInitParams = validateInitParams;

const generateUrl = (orderId, returnId, token, sandbox) => {
  validateParams(orderId, returnId);
  let base = sandbox ? "https://returns.sandbox.reveni.io" : "https://returns.reveni.io";
  let url = "".concat(base, "/returns/").concat(returnId, "?order=").concat(orderId, "&fromIframe=true");
  if (token) url += "&token=".concat(token);
  return url;
};

exports.generateUrl = generateUrl;

const getIframe = url => {
  const styles = 'position: absolute; top: 0; left: 0; height: 100vh; width: 100%; border: none; z-index: 2147483647';
  return "<iframe style=\"".concat(styles, "\" title=\"Reveni returns\" id=\"reveni-returns\" src=\"").concat(url, "\"></iframe>");
};

exports.getIframe = getIframe;

const getElement = selector => {
  const element = document.querySelector(selector);
  if (!element) throw new Error("Element with selector: ".concat(selector, " not found."));
  element.style.zIndex = '2147483647';
  return element;
};

exports.getElement = getElement;

const getQueryParams = script => {
  if (script) {
    const src = script.src;
    const searchParams = src.split('?')[1];
    const params = new URLSearchParams(searchParams);
    const orderId = params.get('orderId');
    const returnId = params.get('returnId');
    const elementSelector = params.get('elementSelector');
    const token = params.get('token');
    return {
      orderId,
      returnId,
      elementSelector,
      token
    };
  }

  throw new Error('reveni-js-sdk not found. Should named reveni-js-sdk.');
};

exports.getQueryParams = getQueryParams;

const parseMessage = data => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

exports.parseMessage = parseMessage;

const executeCallbackOrRedirect = (status, redirectUrl, callbacks) => {
  const callBacksMappingsByStatus = {
    dismiss: callbacks === null || callbacks === void 0 ? void 0 : callbacks.onDismiss,
    success: callbacks === null || callbacks === void 0 ? void 0 : callbacks.onSuccess,
    rejected: callbacks === null || callbacks === void 0 ? void 0 : callbacks.onReject
  };

  if (callBacksMappingsByStatus !== null && callBacksMappingsByStatus !== void 0 && callBacksMappingsByStatus[status]) {
    callBacksMappingsByStatus[status]();
  } else if (redirectUrl) {
    window.location = redirectUrl;
  }
};

exports.executeCallbackOrRedirect = executeCallbackOrRedirect;