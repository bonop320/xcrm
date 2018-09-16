import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  raw: []
}

const products = {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}

export default products
