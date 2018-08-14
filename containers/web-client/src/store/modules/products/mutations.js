import Vue from 'vue'

function SET_ALL (state, arr) {
  const setOne = x =>
    Vue.set(state, x._id, x)

  arr.forEach(setOne)
}

function PUT_ONE (state, data) {
  Vue.set(state, data._id, data)
}

export {
  SET_ALL,
  PUT_ONE
}
