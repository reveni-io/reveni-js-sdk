"use strict";

var _dom = require("@testing-library/dom");

var _reveni = _interopRequireDefault(require("./reveni"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Should throw a error if orderId is null', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js"></script>';
  expect(() => _reveni.default.init('', 'test')).toThrow('Order id cannot be empty');
});
test('Should throw a error if returnId is null', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js"></script>';
  expect(() => _reveni.default.init('test', '')).toThrow('Return id cannot be empty');
});
test('Should throw a error if element selector is empty', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js"></script>';
  expect(() => _reveni.default.init('test', 'test', '')).toThrow('Element selector cannot be empty');
});
test('Should add a iframe inside element', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div"></script>';
  document.body.innerHTML = '<div id="test"></div>';

  _reveni.default.init('test', 'test', '#test');

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  expect(_dom.screen.getByTitle('Reveni returns').src).toBe("".concat("https://returns.reveni.io", "/returns/test?order=test&fromIframe=true"));
});
test('Should remove iframe', () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>';

  _reveni.default.init('test', 'test', '#test');

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();

  _reveni.default.close('#test');

  expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument();
});
test('Should render a error if element not found', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>';
  document.body.innerHTML = '<div id="test"></div>';
  expect(() => _reveni.default.init('test', 'test', '#testfail')).toThrow('Element with selector: #testfail not found.');
});
test('Should render a iframe with the values from queryParams', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#test"></script>';
  document.body.innerHTML = '<div id="test"></div>';

  _reveni.default.init();

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  expect(_dom.screen.getByTitle('Reveni returns').src).toBe("".concat("https://returns.reveni.io", "/returns/test2?order=test&fromIframe=true"));
});
test('Should remove iframe with queryParams', () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>';

  _reveni.default.init();

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();

  _reveni.default.close('#test');

  expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument();
});
test('Should execute close function when send reveni.close message', () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>';

  _reveni.default.init();

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  window.postMessage('reveni.close', '*');
  (0, _dom.waitFor)(() => expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument());
});