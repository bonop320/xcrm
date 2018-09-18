import Vue from 'vue'

function SET_ALL (state, payments) {
  Vue.set(state, 'raw', payments)
}

function PUT_ONE (state, payment) {
  state.raw.push(payment)
}

export {
  SET_ALL,
  PUT_ONE
}
