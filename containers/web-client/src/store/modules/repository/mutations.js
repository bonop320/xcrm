import Vue from 'vue'

function SET_PRODUCTS (state, products) {
  const setOne = x =>
    Vue.set(state.products, x._id, x)

  products.forEach(setOne)
}

function SET_TRANSACTIONS (state, txs) {
  Vue.set(state, 'txs', txs)
}

function PUT_TRANSACTION (state, tx) {
  state.txs.push(tx)
}

function SET_AGG (state, agg) {
  Vue.set(state, 'agg', agg)
}

export {
  SET_PRODUCTS,
  SET_TRANSACTIONS,
  PUT_TRANSACTION,
  SET_AGG
}
