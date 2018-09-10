import { tap } from 'ramda'

import {
  Users,
  Tokens
} from '@/services'

function fetchCurrentUser (ctx) {
  const setUser = data =>
    ctx.commit('SET_USER', data)

  console.log('xx')

  return Users
    .fetchMe()
    .then(tap(setUser))
}

function logoutCurrentUser (ctx) {
  ctx.commit('DEL_USER')
  ctx.commit('DEL_TOKEN')
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

async function populateInitial (ctx) {
  const user = await ctx.dispatch('fetchCurrentUser')

  if (user.role === 'admin') {
    await ctx.dispatch('users/fetchAll')
  }

  await ctx.dispatch('products/fetchAll')
}

export {
  submitLogin,
  fetchCurrentUser,
  logoutCurrentUser,
  populateInitial
}
