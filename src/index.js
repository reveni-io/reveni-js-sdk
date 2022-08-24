import reveni from './reveni'

window.reveni = {
  init: (orderId, returnId, token, elementSelector, sandbox = false, onSuccess, onReject) =>
    reveni.init(orderId, returnId, elementSelector, token, sandbox, true, onSuccess, onReject),
  close: elementSelector => reveni.close(elementSelector),
}

export default {
  init: (orderId, returnId, token, elementSelector, sandbox = false, onSuccess, onReject) =>
    reveni.init(orderId, returnId, elementSelector, token, sandbox, false, onSuccess, onReject),
  close: elementSelector => reveni.close(elementSelector),
}
