import Vue from 'vue'

function SET_ALL (state, txs) {
  Vue.set(state, 'raw', txs)
}

function PUT_ONE (state, tx) {
  state.raw.push(tx)
}

export {
  SET_ALL,
  PUT_ONE
}
