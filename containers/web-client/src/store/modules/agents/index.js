import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  raw: []
}

const users = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}

export default users
