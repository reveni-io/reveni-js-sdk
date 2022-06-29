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
  var url = "".concat("https://returns.reveni.io", "/returns/").concat(returnId, "?order=").concat(orderId, "&fromIframe=true");
  if (token) url += "&token=".concat(token);
  return url;
};
var getIframe = function getIframe(url) {
  var styles = 'position: absolute; top: 0; left: 0; height: 100vh; width: 100%; border: none;';
  return "<iframe style=\"".concat(styles, "\" title=\"Reveni returns\" id=\"reveni-returns\" src=\"").concat(url, "\"></iframe>");
};
var getElement = function getElement(selector) {
  var element = document.querySelector(selector);
  if (!element) throw new Error("Element with selector: ".concat(selector, " not found."));
  return element;
};
var getQueryParams = function getQueryParams(script) {
  var src = script.src;
  var searchParams = src.split('?')[1];
  var params = new URLSearchParams(searchParams);
  var orderId = params.get('orderId');
  var returnId = params.get('returnId');
  var elementSelector = params.get('elementSelector');
  var token = params.get('token');
  return {
    orderId: orderId,
    returnId: returnId,
    elementSelector: elementSelector,
    token: token
  };
};var close = function close(elementSelector) {
  var element = getElement(elementSelector);
  element.innerHTML = '';
};

var init = function init(orderId, returnId, elementSelector, token) {
  var scripts = document.getElementsByTagName('script');
  var index = scripts.length - 1;
  var myScript = scripts[index];
  var queryParams = getQueryParams(myScript);
  if (!orderId) orderId = queryParams.orderId;
  if (!returnId) returnId = queryParams.returnId;
  if (!elementSelector) elementSelector = queryParams.elementSelector;
  if (!token) token = queryParams.token;
  validateInitParams(orderId, returnId, elementSelector);
  var url = generateUrl(orderId, returnId, token);
  var iframe = getIframe(url);
  var element = getElement(elementSelector);
  element.innerHTML = iframe;
  window.addEventListener('message', function (e) {
    if (e.data === 'reveni.close') {
      close(elementSelector);
    }
  });
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