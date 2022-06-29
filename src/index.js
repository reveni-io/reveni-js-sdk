import reveni from './reveni'

window.reveni = {
  init: (orderId, returnId, token, elementSelector) => reveni.init(orderId, returnId, elementSelector, token),
  close: elementSelector => reveni.close(elementSelector),
}

export default {
  init: (orderId, returnId, token, elementSelector) => reveni.init(orderId, returnId, elementSelector, token),
  close: elementSelector => reveni.close(elementSelector),
}
