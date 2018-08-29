import { tap } from 'ramda'

import {
  Users,
  Tokens
} from '@/services'

function fetchCurrentUser (ctx) {
  const setUser = data =>
    ctx.commit('SET_USER', data)

  return Users
    .fetchMe()
    .then(tap(setUser))
}

function submitLogin (ctx, creds) {
  const setToken = data =>
    ctx.commit('SET_TOKEN', data.token)

  const fetchUser = _ =>
    ctx.dispatch('fetchCurrentUser')

  return Tokens
    .create(creds)
    .then(setToken)
    .then(fetchUser)
}

export {
  submitLogin,
  fetchCurrentUser
}
