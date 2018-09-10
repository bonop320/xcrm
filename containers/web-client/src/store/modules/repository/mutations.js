import Vue from 'vue'

function SET_PRODUCTS (state, products) {
  const setOne = x =>
    Vue.set(state.products, x._id, x)

  products.forEach(setOne)
}

function SET_TRANSACTIONS (state, txs) {
  Vue.set(state, 'transactions', txs)
}

export {
  SET_PRODUCTS,
  SET_TRANSACTIONS
}
