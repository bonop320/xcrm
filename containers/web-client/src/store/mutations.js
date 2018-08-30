import Vue from 'vue'

const SET_USER = (state, user) => {
  Vue.set(state, 'user', user)
}

const SET_TOKEN = (state, token) => {
  Vue.set(state, 'token', token)
  window.localStorage.setItem('token', token)
}

const DEL_TOKEN = (state) => {
  Vue.delete(state, 'token')
}

export {
  SET_USER,
  SET_TOKEN,
  DEL_TOKEN
}
