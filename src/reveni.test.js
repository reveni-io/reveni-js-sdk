import { screen } from '@testing-library/dom'
import reveni from './reveni'

test('Should throw a error if orderId is null', () => {
  expect(() => reveni.init('', 'test')).toThrow('Order id cannot be empty')
})

test('Should throw a error if returnId is null', () => {
  expect(() => reveni.init('test', '')).toThrow('Return id cannot be empty')
})

test('Should throw a error if element selector is empty', () => {
  expect(() => reveni.init('test', 'test', '')).toThrow('Element selector cannot be empty')
})

test('Should add a iframe inside element', () => {
  document.body.innerHTML = '<div id="test"></div>'
  reveni.init('test', 'test', '#test')
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  expect(screen.getByTitle('Reveni returns').src).toBe('https://returns.reveni.io/returns/test?order=test')
})

test('Should remove iframe', () => {
  document.body.innerHTML = '<div id="test"></div>'
  reveni.init('test', 'test', '#test')
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  reveni.close('#test')
  expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument()
})

test('Should render a error if element not found', () => {
  document.body.innerHTML = '<div id="test"></div>'
  expect(() => reveni.init('test', 'test', '#testfail')).toThrow('Element with selector: #testfail not found.')
})
