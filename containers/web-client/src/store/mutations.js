import Vue from 'vue'

const SET_USER = (state, user) => {
  Vue.set(state, 'user', user)
}

const DEL_USER = state => {
  Vue.delete(state, 'user')
}

const SET_TOKEN = (state, token) => {
  Vue.set(state, 'token', token)
  window.localStorage.setItem('token', token)
}

const DEL_TOKEN = state => {
  Vue.delete(state, 'token')
  window.localStorage.removeItem('token')
}

const SET_AGENTS = (state, agents) => {
  Vue.set(state, 'agents', agents)
}

const PUT_AGENT = (state, agent) => {
  state.agents.push(agent)
}

const SET_PRODUCTS = (state, products) => {
  Vue.set(state, 'products', products)
}

const PUT_PRODUCT = (state, product) => {
  state.products.push(product)
}

export {
  SET_USER,
  DEL_USER,
  SET_TOKEN,
  DEL_TOKEN,
  SET_AGENTS,
  PUT_AGENT,
  SET_PRODUCTS,
  PUT_PRODUCT
}
