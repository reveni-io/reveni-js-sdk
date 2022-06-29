export const validateParams = (orderId, returnId) => {
  if (!orderId) throw new Error('Order id cannot be empty')
  if (!returnId) throw new Error('Return id cannot be empty')
}

export const validateInitParams = (orderId, returnId, elementSelector) => {
  validateParams(orderId, returnId)
  if (!elementSelector) throw new Error('Element selector cannot be empty')
}

export const generateUrl = (orderId, returnId, token, sandbox) => {
  validateParams(orderId, returnId)
  let base = sandbox ? process.env.HOST_SANDBOX : process.env.HOST
  let url = `${base}/returns/${returnId}?order=${orderId}&fromIframe=true`
  if (token) url += `&token=${token}`

  return url
}

export const getIframe = url => {
  const styles = 'position: absolute; top: 0; left: 0; height: 100vh; width: 100%; border: none;'
  return `<iframe style="${styles}" title="Reveni returns" id="reveni-returns" src="${url}"></iframe>`
}

export const getElement = selector => {
  const element = document.querySelector(selector)
  if (!element) throw new Error(`Element with selector: ${selector} not found.`)

  return element
}

export const getQueryParams = script => {
  const src = script.src
  const searchParams = src.split('?')[1]

  const params = new URLSearchParams(searchParams)
  const orderId = params.get('orderId')
  const returnId = params.get('returnId')
  const elementSelector = params.get('elementSelector')
  const token = params.get('token')

  return { orderId, returnId, elementSelector, token }
}
