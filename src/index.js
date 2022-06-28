import reveni from './reveni'

window.reveni = {
  init: (orderId, returnId, token, elementSelector) => reveni.init(orderId, returnId, token, elementSelector),
  close: elementSelector => reveni.close(elementSelector),
}
