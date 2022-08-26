"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.json.stringify.js");

var _dom = require("@testing-library/dom");

var _reveni = _interopRequireDefault(require("./reveni"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => {
  const location = new URL('https://www.example.com');
  location.assign = jest.fn();
  delete window.location;
  window.location = location;
});
test('Should throw a error if orderId is null', () => {
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "\"></script>");
  expect(() => _reveni.default.init('', 'test')).toThrow('Order id cannot be empty');
});
test('Should throw a error if returnId is null', () => {
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "\"></script>");
  expect(() => _reveni.default.init('test', '')).toThrow('Return id cannot be empty');
});
test('Should throw a error if element selector is empty', () => {
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "\"></script>");
  expect(() => _reveni.default.init('test', 'test', '')).toThrow('Element selector cannot be empty');
});
test('Should add a iframe inside element', () => {
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#div\"></script>");
  document.body.innerHTML = '<div id="test"></div>';

  _reveni.default.init('test', 'test', '#test');

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  expect(_dom.screen.getByTitle('Reveni returns').src).toBe("".concat("https://returns.reveni.io", "/returns/test?order=test&fromIframe=true"));
});
test('Should remove iframe', () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest\"></script>");

  _reveni.default.init('test', 'test', '#test');

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();

  _reveni.default.close('#test');

  expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument();
});
test('Should render a error if element not found', () => {
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest\"></script>");
  document.body.innerHTML = '<div id="test"></div>';
  expect(() => _reveni.default.init('test', 'test', '#testfail')).toThrow('Element with selector: #testfail not found.');
});
test('Should render a iframe with the values from queryParams', () => {
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test\"></script>");
  document.body.innerHTML = '<div id="test"></div>';

  _reveni.default.init();

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  expect(_dom.screen.getByTitle('Reveni returns').src).toBe("".concat("https://returns.reveni.io", "/returns/test2?order=test&fromIframe=true"));
});
test('Should remove iframe with queryParams', () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>");

  _reveni.default.init();

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();

  _reveni.default.close('#test');

  expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument();
});
test('Should execute close function when send reveni.close message', async () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>");

  _reveni.default.init();

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  window.postMessage(JSON.stringify({
    type: 'reveni.close'
  }), '*', '*');
  await (0, _dom.waitFor)(() => expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument());
});
test('Should execute close function when send reveni.close message', () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "<script src=\"fake-test.js?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>";
  expect(() => _reveni.default.init()).toThrow('reveni-js-sdk not found. Should named reveni-js-sdk.');
});
test('Should execute close function and redirect to url', async () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "<script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>");

  _reveni.default.init();

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  window.postMessage(JSON.stringify({
    type: 'reveni.close',
    redirectUrl: 'https://google.es'
  }), '*', '*');
  await (0, _dom.waitFor)(() => expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument());
  expect(window.location).toBe('https://google.es');
});
test('Should execute close function and execute onSuccess callback', async () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "\n  <script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>\n  ");
  const successFn = jest.fn();

  _reveni.default.init(undefined, undefined, undefined, undefined, undefined, undefined, {
    onSuccess: successFn
  });

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  window.postMessage(JSON.stringify({
    type: 'reveni.close',
    status: 'success'
  }), '*', '*');
  await (0, _dom.waitFor)(() => expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument());
  expect(successFn).toHaveBeenCalled();
});
test('Should execute close function and execute onReject callback', async () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "\n  <script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>\n  ");
  const onReject = jest.fn();

  _reveni.default.init(undefined, undefined, undefined, undefined, undefined, undefined, {
    onReject: onReject
  });

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  window.postMessage(JSON.stringify({
    type: 'reveni.close',
    status: 'rejected'
  }), '*', '*');
  await (0, _dom.waitFor)(() => expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument());
  expect(onReject).toHaveBeenCalled();
});
test('Should execute close function and execute onFinish callback', async () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "\n  <script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>\n  ");
  const onFinish = jest.fn();

  _reveni.default.init(undefined, undefined, undefined, undefined, undefined, undefined, {
    onFinish
  });

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  window.postMessage(JSON.stringify({
    type: 'reveni.close',
    status: 'rejected'
  }), '*', '*');
  await (0, _dom.waitFor)(() => expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument());
  expect(onFinish).toHaveBeenCalled();
});
test('Should execute close function and execute onDismiss callback', async () => {
  document.body.innerHTML = '<div id="test"></div>';
  document.head.innerHTML = "\n  <script src=\"".concat("reveni-js-sdk.js", "?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest\"></script>\n  ");
  const onDismiss = jest.fn();

  _reveni.default.init(undefined, undefined, undefined, undefined, undefined, undefined, {
    onDismiss
  });

  expect(_dom.screen.getByTitle('Reveni returns')).toBeInTheDocument();
  window.postMessage(JSON.stringify({
    type: 'reveni.close',
    status: 'dismiss'
  }), '*', '*');
  await (0, _dom.waitFor)(() => expect(_dom.screen.queryByTitle('Reveni returns')).not.toBeInTheDocument());
  expect(onDismiss).toHaveBeenCalled();
});