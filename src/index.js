import reveni from './reveni'

window.reveni = {
  init: (
    orderId,
    returnId,
    token,
    elementSelector,
    sandbox = false,
    callbacks = { onSuccess: null, onReject: null, onFinish: null }
  ) => reveni.init(orderId, returnId, elementSelector, token, sandbox, true, callbacks),
  close: elementSelector => reveni.close(elementSelector),
}

export default {
  init: (
    orderId,
    returnId,
    token,
    elementSelector,
    sandbox = false,
    callbacks = { onSuccess: null, onReject: null, onFinish: null }
  ) => reveni.init(orderId, returnId, elementSelector, token, sandbox, false, callbacks),
  close: elementSelector => reveni.close(elementSelector),
}
