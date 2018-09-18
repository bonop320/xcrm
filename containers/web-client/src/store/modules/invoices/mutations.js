import Vue from 'vue'

function SET_ALL (state, products) {
  Vue.set(state, 'raw', products)
}

function PUT_ONE (state, product) {
  state.raw.push(product)
}

export {
  SET_ALL,
  PUT_ONE
}
