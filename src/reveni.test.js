import { screen } from '@testing-library/dom'
import reveni from './reveni'

test('Should throw a error if orderId is null', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js"></script>'
  expect(() => reveni.init('', 'test')).toThrow('Order id cannot be empty')
})

test('Should throw a error if returnId is null', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js"></script>'
  expect(() => reveni.init('test', '')).toThrow('Return id cannot be empty')
})

test('Should throw a error if element selector is empty', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js"></script>'
  expect(() => reveni.init('test', 'test', '')).toThrow('Element selector cannot be empty')
})

test('Should add a iframe inside element', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div"></script>'
  document.body.innerHTML = '<div id="test"></div>'
  reveni.init('test', 'test', '#test')
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  expect(screen.getByTitle('Reveni returns').src).toBe(`${process.env.HOST}/returns/test?order=test`)
})

test('Should remove iframe', () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML =
    '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>'
  reveni.init('test', 'test', '#test')
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  reveni.close('#test')
  expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument()
})

test('Should render a error if element not found', () => {
  document.head.innerHTML =
    '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>'
  document.body.innerHTML = '<div id="test"></div>'
  expect(() => reveni.init('test', 'test', '#testfail')).toThrow('Element with selector: #testfail not found.')
})

test('Should render a iframe with the values from queryParams', () => {
  document.head.innerHTML = '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#test"></script>'
  document.body.innerHTML = '<div id="test"></div>'

  reveni.init()

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  expect(screen.getByTitle('Reveni returns').src).toBe(`${process.env.HOST}/returns/test2?order=test`)
})

test('Should remove iframe with queryParams', () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML =
    '<script src="reveni-js-sdk.js?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>'
  reveni.init()
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  reveni.close('#test')
  expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument()
})
