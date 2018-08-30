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

export {
  SET_USER,
  DEL_USER,
  SET_TOKEN,
  DEL_TOKEN
}
