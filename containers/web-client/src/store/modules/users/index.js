import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {}

const users = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}

export default users
