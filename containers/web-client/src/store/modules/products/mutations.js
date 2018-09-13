import Vue from 'vue'

function SET_ALL (state, arr) {
  const setOne = x =>
    Vue.set(state, x._id, x)

  arr.forEach(setOne)
}

function PUT_ONE (state, data) {
  Vue.set(state, data._id, data)
}

function PUT_TX (state, tx) {
  const product = state[tx.subject]
  product && product.txs.push(tx)
}

export {
  SET_ALL,
  PUT_ONE,
  PUT_TX
}
