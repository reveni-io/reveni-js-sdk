import reveni from './reveni'

window.reveni = {
  init: (orderId, returnId, token, elementSelector, sandbox = false) =>
    reveni.init(orderId, returnId, elementSelector, token, sandbox),
  close: elementSelector => reveni.close(elementSelector),
}

export default {
  init: (orderId, returnId, token, elementSelector, sandbox = false) =>
    reveni.init(orderId, returnId, elementSelector, token, sandbox),
  close: elementSelector => reveni.close(elementSelector),
}
