import Axios from 'axios'

import { Users } from '@/services'

const request = Axios.create({ baseURL: '/api' })

function fetchCurrentUser (ctx) {
  return Users
    .fetchMe()
}

function submitLogin (ctx, creds) {
  const setToken = data =>
    ctx.commit('SET_TOKEN', data.token)

  const fetchUser = _ =>
    ctx.dispatch('fetchCurrentUser')

  return request
    .post('/tokens', creds)
    .then(res => res.data)
    .then(setToken)
    .then(fetchUser)
    .catch(console.error)
}

export {
  submitLogin,
  fetchCurrentUser
}
