import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  products: [
    {"_id":"01CMFQ6Y0Z0X7NTPNX85ZFAP6B","_rev":"1-7e5c4d4306e5ea21f0dea1db660305bb","name":"The Great Soviet Encyclopedia","price":100},
    {"_id":"01CMFQ9VXGESJCZMYPQ9BZ49S5","_rev":"1-7e5c4d4306e5ea21f0dea1db660305bb","name":"The Ok Soviet Encyclopedia","price":20}
  ]
}

const store = new Vuex.Store({
  state
})

export default store
