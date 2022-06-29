import { generateUrl, getElement, getIframe, getQueryParams, validateInitParams } from './helpers'

const close = elementSelector => {
  const element = getElement(elementSelector)
  element.innerHTML = ''
}

const init = (orderId, returnId, elementSelector, token, sandbox) => {
  let scripts = document.getElementsByTagName('script')
  let index = scripts.length - 1
  let myScript = scripts[index]
  const queryParams = getQueryParams(myScript)

  if (!orderId) orderId = queryParams.orderId
  if (!returnId) returnId = queryParams.returnId
  if (!elementSelector) elementSelector = queryParams.elementSelector
  if (!token) token = queryParams.token

  validateInitParams(orderId, returnId, elementSelector)
  const url = generateUrl(orderId, returnId, token, sandbox)
  const iframe = getIframe(url)
  const element = getElement(elementSelector)
  element.innerHTML = iframe

  window.addEventListener('message', e => {
    if (e.data === 'reveni.close') {
      close(elementSelector)
    }
  })
}

export default {
  init,
  close,
}
