export const validateParams = (orderId, returnId) => {
  if (!orderId) throw new Error('Order id cannot be empty')
  if (!returnId) throw new Error('Return id cannot be empty')
}

export const validateInitParams = (orderId, returnId, elementSelector) => {
  validateParams(orderId, returnId)
  if (!elementSelector) throw new Error('Element selector cannot be empty')
}

export const generateUrl = (orderId, returnId, token) => {
  validateParams(orderId, returnId)
  let url = `https://returns.reveni.io/returns/${returnId}?order=${orderId}`
  if (token) url += `&token=${token}`

  return url
}

export const getIframe = url => {
  return `<iframe title="Reveni returns" id="reveni-returns" src="${url}"></iframe>`
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
