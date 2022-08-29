import { screen, waitFor } from '@testing-library/dom'
import reveni from './reveni'

beforeEach(() => {
  const location = new URL('https://www.example.com')
  location.assign = jest.fn()
  delete window.location
  window.location = location
})

test('Should throw a error if orderId is null', () => {
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}"></script>`
  expect(() => reveni.init('', 'test')).toThrow('Order id cannot be empty')
})

test('Should throw a error if returnId is null', () => {
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}"></script>`
  expect(() => reveni.init('test', '')).toThrow('Return id cannot be empty')
})

test('Should throw a error if element selector is empty', () => {
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}"></script>`
  expect(() => reveni.init('test', 'test', '')).toThrow('Element selector cannot be empty')
})

test('Should add a iframe inside element', () => {
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#div"></script>`
  document.body.innerHTML = '<div id="test"></div>'
  reveni.init('test', 'test', '#test')
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  expect(screen.getByTitle('Reveni returns').src).toBe(`${process.env.HOST}/returns/test?order=test&fromIframe=true`)
})

test('Should remove iframe', () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>`
  reveni.init('test', 'test', '#test')
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  reveni.close('#test')
  expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument()
})

test('Should render a error if element not found', () => {
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#div&token=tokenTest"></script>`
  document.body.innerHTML = '<div id="test"></div>'
  expect(() => reveni.init('test', 'test', '#testfail')).toThrow('Element with selector: #testfail not found.')
})

test('Should render a iframe with the values from queryParams', () => {
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test"></script>`
  document.body.innerHTML = '<div id="test"></div>'

  reveni.init()

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  expect(screen.getByTitle('Reveni returns').src).toBe(`${process.env.HOST}/returns/test2?order=test&fromIframe=true`)
})

test('Should remove iframe with queryParams', () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>`
  reveni.init()
  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  reveni.close('#test')
  expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument()
})

test('Should execute close function when send reveni.close message', async () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>`
  reveni.init()

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  window.postMessage(JSON.stringify({ type: 'reveni.close' }), '*', '*')
  await waitFor(() => expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument())
})

test('Should execute close function when send reveni.close message', () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `<script src="fake-test.js?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>`
  expect(() => reveni.init()).toThrow('reveni-js-sdk not found. Should named reveni-js-sdk.')
})

test('Should execute close function and redirect to url', async () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `<script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>`
  reveni.init()

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  window.postMessage(
    JSON.stringify({ type: 'reveni.close', status: 'success', redirectUrl: 'https://google.es' }),
    '*',
    '*'
  )
  await waitFor(() => expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument())
  expect(window.location).toBe('https://google.es')
})

test('Should execute close function and execute onSuccess callback', async () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `
  <script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>
  `
  const successFn = jest.fn()
  reveni.init(undefined, undefined, undefined, undefined, undefined, undefined, { onSuccess: successFn })

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  window.postMessage(JSON.stringify({ type: 'reveni.close', status: 'success' }), '*', '*')
  await waitFor(() => expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument())
  expect(successFn).toHaveBeenCalled()
})

test('Should execute close function and execute onReject callback', async () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `
  <script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>
  `
  const onReject = jest.fn()
  reveni.init(undefined, undefined, undefined, undefined, undefined, undefined, { onReject: onReject })

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  window.postMessage(JSON.stringify({ type: 'reveni.close', status: 'rejected' }), '*', '*')
  await waitFor(() => expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument())
  expect(onReject).toHaveBeenCalled()
})

test('Should execute close function and execute onFinish callback', async () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `
  <script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>
  `
  const onFinish = jest.fn()
  reveni.init(undefined, undefined, undefined, undefined, undefined, undefined, { onFinish })

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  window.postMessage(JSON.stringify({ type: 'reveni.close', status: 'rejected' }), '*', '*')
  await waitFor(() => expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument())
  expect(onFinish).toHaveBeenCalled()
})

test('Should execute close function and execute onDismiss callback', async () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `
  <script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>
  `
  const onDismiss = jest.fn()
  reveni.init(undefined, undefined, undefined, undefined, undefined, undefined, { onDismiss })

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  window.postMessage(JSON.stringify({ type: 'reveni.close', status: 'dismiss' }), '*', '*')
  await waitFor(() => expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument())
  expect(onDismiss).toHaveBeenCalled()
})

test('Should execute close function and redirect to onDismiss url', async () => {
  document.body.innerHTML = '<div id="test"></div>'
  document.head.innerHTML = `
  <script src="${process.env.SDK_OUTPUT_NAME}?orderId=test&returnId=test2&elementSelector=#test&token=tokenTest"></script>
  `
  const onDismiss = jest.fn()
  reveni.init(undefined, undefined, undefined, undefined, undefined, undefined)

  expect(screen.getByTitle('Reveni returns')).toBeInTheDocument()
  window.postMessage(
    JSON.stringify({ type: 'reveni.close', redirectUrl: 'https://dismissurl.com', status: 'dismiss' }),
    '*',
    '*'
  )
  await waitFor(() => expect(screen.queryByTitle('Reveni returns')).not.toBeInTheDocument())
  expect(window.location).toBe('https://dismissurl.com')
})
