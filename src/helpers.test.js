import { generateUrl, getElement, getIframe, getQueryParams } from './helpers'

test('Should throw a error if orderId is null', () => {
  expect(() => generateUrl('', 'test')).toThrow('Order id cannot be empty')
})

test('Should throw a error if returnId is null', () => {
  expect(() => generateUrl('test', '')).toThrow('Return id cannot be empty')
})

test('Should generate a url with orderId and returnId', () => {
  expect(generateUrl('orderId', 'returnId')).toBe(`${process.env.HOST}/returns/returnId?order=orderId&fromIframe=true`)
})

test('Should generate a url with orderId and returnId with token', () => {
  expect(generateUrl('orderId', 'returnId', 'token')).toBe(
    `${process.env.HOST}/returns/returnId?order=orderId&fromIframe=true&token=token`
  )
})

test('Should return a iframe with the url', () => {
  expect(getIframe('https://google.es')).toBe(
    '<iframe style="position: absolute; top: 0; left: 0; height: 100vh; width: 100%; border: none;" title="Reveni returns" id="reveni-returns" src="https://google.es"></iframe>'
  )
})

test('Should return orderId, returnId and elementSelector from script src', () => {
  document.head.innerHTML =
    '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>'
  const script = document.getElementsByTagName('script')

  expect(getQueryParams(script[0])).toStrictEqual({
    orderId: 'test',
    returnId: 'test2',
    elementSelector: '#div',
    token: 'tokenTest',
  })
})

test('Should return sandbox url if sandbox parameter is true', () => {
  expect(generateUrl('orderId', 'returnId', 'token', true)).toBe(
    `${process.env.HOST_SANDBOX}/returns/returnId?order=orderId&fromIframe=true&token=token`
  )
})

test('Should return default url if sandbox parameter is false', () => {
  expect(generateUrl('orderId', 'returnId', 'token', false)).toBe(
    `${process.env.HOST}/returns/returnId?order=orderId&fromIframe=true&token=token`
  )
})

test('Should return a element with z-index 2147483647', () => {
  document.body.innerHTML = '<div id="test"></div>'
  expect(getElement('#test').style.zIndex).toBe('2147483647')
})
