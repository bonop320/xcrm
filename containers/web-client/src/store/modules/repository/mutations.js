import Vue from 'vue'

function SET_PRODUCTS (state, products) {
  const setOne = x =>
    Vue.set(state, x._id, x)

  products.forEach(setOne)
}

export {
  SET_PRODUCTS
}
