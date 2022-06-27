import { generateUrl, getElement, getIframe, validateInitParams } from './helpers'

const init = (orderId, returnId, elementSelector, token) => {
  validateInitParams(orderId, returnId, elementSelector)
  const url = generateUrl(orderId, returnId, token)
  const iframe = getIframe(url)
  const element = getElement(elementSelector)
  element.innerHTML = iframe
}

const close = elementSelector => {
  const element = getElement(elementSelector)
  element.innerHTML = ''
}

export default {
  init,
  close,
}
