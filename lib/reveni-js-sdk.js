var reveni = (function () {
  'use strict';

  var validateParams = function validateParams(orderId, returnId) {
    if (!orderId) throw new Error('Order id cannot be empty');
    if (!returnId) throw new Error('Return id cannot be empty');
  };
  var validateInitParams = function validateInitParams(orderId, returnId, elementSelector) {
    validateParams(orderId, returnId);
    if (!elementSelector) throw new Error('Element selector cannot be empty');
  };
  var generateUrl = function generateUrl(orderId, returnId, token, sandbox) {
    validateParams(orderId, returnId);
    var base = sandbox ? "https://returns.sandbox.reveni.io" : "https://returns.reveni.io";
    var url = "".concat(base, "/returns/").concat(returnId, "?order=").concat(orderId, "&fromIframe=true");
    if (token) url += "&token=".concat(token);
    return url;
  };
  var getIframe = function getIframe(url) {
    var styles = 'position: absolute; top: 0; left: 0; height: 100vh; width: 100%; border: none; z-index: 2147483647';
    return "<iframe style=\"".concat(styles, "\" title=\"Reveni returns\" id=\"reveni-returns\" src=\"").concat(url, "\"></iframe>");
  };
  var getElement = function getElement(selector) {
    var element = document.querySelector(selector);
    if (!element) throw new Error("Element with selector: ".concat(selector, " not found."));
    element.style.zIndex = '2147483647';
    return element;
  };
  var getQueryParams = function getQueryParams(script) {
    if (script) {
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
    }

    throw new Error('reveni-js-sdk not found. Should named reveni-js-sdk.');
  };
  var parseMessage = function parseMessage(data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  };

  var close = function close(elementSelector, redirectUrl, returnStatus, onSuccess, onReject) {
    var element = getElement(elementSelector);
    element.innerHTML = '';
    if (returnStatus === 'success' && onSuccess) onSuccess();
    if (returnStatus === 'reject' && onReject) onReject();
    if (redirectUrl && !onSuccess && !onReject) window.location = redirectUrl;
  };

  var init = function init(orderId, returnId, elementSelector, token, sandbox) {
    var loadedByTag = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var onSuccess = arguments.length > 6 ? arguments[6] : undefined;
    var onReject = arguments.length > 7 ? arguments[7] : undefined;

    if (loadedByTag) {
      var scriptTags = document.querySelectorAll('script');
      var currentScript = Array.from(scriptTags).find(function (script) {
        return script.src.includes("reveni-js-sdk.js");
      });
      var queryParams = getQueryParams(currentScript);
      if (!orderId) orderId = queryParams.orderId;
      if (!returnId) returnId = queryParams.returnId;
      if (!elementSelector) elementSelector = queryParams.elementSelector;
      if (!token) token = queryParams.token;
    }

    validateInitParams(orderId, returnId, elementSelector);
    var url = generateUrl(orderId, returnId, token, sandbox);
    var iframe = getIframe(url);
    var element = getElement(elementSelector);
    element.innerHTML = iframe;
    window.addEventListener('message', function (e) {
      var data = parseMessage(e.data);

      if ((data === null || data === void 0 ? void 0 : data.type) === 'reveni.close') {
        close(elementSelector, data === null || data === void 0 ? void 0 : data.redirectUrl, data === null || data === void 0 ? void 0 : data.status, onSuccess, onReject);
      }
    });
  };

  var reveni = {
    init: init,
    close: close
  };

  window.reveni = {
    init: function init(orderId, returnId, token, elementSelector) {
      var sandbox = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var onSuccess = arguments.length > 5 ? arguments[5] : undefined;
      var onReject = arguments.length > 6 ? arguments[6] : undefined;
      return reveni.init(orderId, returnId, elementSelector, token, sandbox, true, onSuccess, onReject);
    },
    close: function close(elementSelector) {
      return reveni.close(elementSelector);
    }
  };
  var index = {
    init: function init(orderId, returnId, token, elementSelector) {
      var sandbox = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var onSuccess = arguments.length > 5 ? arguments[5] : undefined;
      var onReject = arguments.length > 6 ? arguments[6] : undefined;
      return reveni.init(orderId, returnId, elementSelector, token, sandbox, false, onSuccess, onReject);
    },
    close: function close(elementSelector) {
      return reveni.close(elementSelector);
    }
  };

  return index;

})();
