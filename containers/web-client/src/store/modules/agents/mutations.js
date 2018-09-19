import Vue from 'vue'

function SET_ALL (state, raw) {
  Vue.set(state, 'raw', raw)
}

function PUT_ONE (state, agent) {
  state.raw.push(agent)
}

export {
  SET_ALL,
  PUT_ONE
}
