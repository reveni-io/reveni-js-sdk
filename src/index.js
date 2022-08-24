import reveni from './reveni'

window.reveni = {
  init: (orderId, returnId, token, elementSelector, sandbox = false, onSuccess, onReject, onFinish) =>
    reveni.init(orderId, returnId, elementSelector, token, sandbox, true, onSuccess, onReject, onFinish),
  close: elementSelector => reveni.close(elementSelector),
}

export default {
  init: (orderId, returnId, token, elementSelector, sandbox = false, onSuccess, onReject, onFinish) =>
    reveni.init(orderId, returnId, elementSelector, token, sandbox, false, onSuccess, onReject, onFinish),
  close: elementSelector => reveni.close(elementSelector),
}
