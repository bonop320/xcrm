import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  raw: []
}

const store = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}

export default store
