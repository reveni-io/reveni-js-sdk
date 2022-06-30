import { generateUrl, getElement, getIframe, getQueryParams, validateInitParams } from './helpers'

const close = elementSelector => {
  const element = getElement(elementSelector)
  element.innerHTML = ''
}

const init = (orderId, returnId, elementSelector, token, sandbox, loadedByTag = true) => {
  if (loadedByTag) {
    const scriptTags = document.querySelectorAll('script')
    const currentScript = Array.from(scriptTags).find(script => script.src.includes(process.env.SDK_OUTPUT_NAME))
    const queryParams = getQueryParams(currentScript)

    if (!orderId) orderId = queryParams.orderId
    if (!returnId) returnId = queryParams.returnId
    if (!elementSelector) elementSelector = queryParams.elementSelector
    if (!token) token = queryParams.token
  }

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
