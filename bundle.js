(function () {
  'use strict';

  const validateParams = (orderId, returnId) => {
    if (!orderId) throw new Error('Order id cannot be empty')
    if (!returnId) throw new Error('Return id cannot be empty')
  };

  const validateInitParams = (orderId, returnId, elementSelector) => {
    validateParams(orderId, returnId);
    if (!elementSelector) throw new Error('Element selector cannot be empty')
  };

  const generateUrl = (orderId, returnId, token) => {
    validateParams(orderId, returnId);
    let url = `https://returns.reveni.io/returns/${returnId}?order=${orderId}`;
    if (token) url += `&token=${token}`;

    return url
  };

  const getIframe = url => {
    return `<iframe title="Reveni returns" id="reveni-returns" src="${url}"></iframe>`
  };

  const getElement = selector => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element with selector: ${selector} not found.`)

    return element
  };

  const init = (orderId, returnId, elementSelector, token) => {
    validateInitParams(orderId, returnId, elementSelector);
    const url = generateUrl(orderId, returnId, token);
    const iframe = getIframe(url);
    const element = getElement(elementSelector);
    element.innerHTML = iframe;
  };

  const close = elementSelector => {
    const element = getElement(elementSelector);
    element.innerHTML = '';
  };

  var reveni = {
    init,
    close,
  };

  window.reveni = {
    init: (orderId, returnId, token, elementSelector) => reveni.init(orderId, returnId, token, elementSelector),
    close: elementSelector => reveni.close(elementSelector),
  };

})();
