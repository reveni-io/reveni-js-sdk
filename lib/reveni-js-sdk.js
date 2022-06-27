(function(){'use strict';var validateParams = function validateParams(orderId, returnId) {
  if (!orderId) throw new Error('Order id cannot be empty');
  if (!returnId) throw new Error('Return id cannot be empty');
};
var validateInitParams = function validateInitParams(orderId, returnId, elementSelector) {
  validateParams(orderId, returnId);
  if (!elementSelector) throw new Error('Element selector cannot be empty');
};
var generateUrl = function generateUrl(orderId, returnId, token) {
  validateParams(orderId, returnId);
  var url = "https://returns.reveni.io/returns/".concat(returnId, "?order=").concat(orderId);
  if (token) url += "&token=".concat(token);
  return url;
};
var getIframe = function getIframe(url) {
  return "<iframe title=\"Reveni returns\" id=\"reveni-returns\" src=\"".concat(url, "\"></iframe>");
};
var getElement = function getElement(selector) {
  var element = document.querySelector(selector);
  if (!element) throw new Error("Element with selector: ".concat(selector, " not found."));
  return element;
};var init = function init(orderId, returnId, elementSelector, token) {
  validateInitParams(orderId, returnId, elementSelector);
  var url = generateUrl(orderId, returnId, token);
  var iframe = getIframe(url);
  var element = getElement(elementSelector);
  element.innerHTML = iframe;
};

var close = function close(elementSelector) {
  var element = getElement(elementSelector);
  element.innerHTML = '';
};

var reveni = {
  init: init,
  close: close
};window.reveni = {
  init: function init(orderId, returnId, token, elementSelector) {
    return reveni.init(orderId, returnId, token, elementSelector);
  },
  close: function close(elementSelector) {
    return reveni.close(elementSelector);
  }
};})();