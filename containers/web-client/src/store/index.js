import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null
  },
  actions,
  getters,
  mutations,
  modules
})

export default store
