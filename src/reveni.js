import { generateUrl, getElement, getIframe, getQueryParams, parseMessage, validateInitParams } from './helpers'

const close = (elementSelector, redirectUrl, returnStatus, onSuccess, onReject) => {
  const element = getElement(elementSelector)
  element.innerHTML = ''
  if (returnStatus === 'success' && onSuccess) onSuccess()
  if (returnStatus === 'reject' && onReject) onReject()
  if (redirectUrl && !onSuccess && !onReject) window.location = redirectUrl
}

const init = (orderId, returnId, elementSelector, token, sandbox, loadedByTag = true, onSuccess, onReject) => {
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
    const data = parseMessage(e.data)
    if (data?.type === 'reveni.close') {
      close(elementSelector, data?.redirectUrl, data?.status, onSuccess, onReject)
    }
  })
}

export default {
  init,
  close,
}
