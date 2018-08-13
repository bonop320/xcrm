import Vue from 'vue'

function SET_ALL (state, arr) {
  const setOne = x =>
    Vue.set(state, x._id, x)

  arr.forEach(setOne)
}

export {
  SET_ALL
}
