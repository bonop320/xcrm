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

function logoutCurrentUser (ctx) {
  ctx.commit('DEL_USER')
  ctx.commit('DEL_TOKEN')

  window.location.reload(true)
}

function submitLogin (ctx, creds) {
  const setToken = data =>
    ctx.commit('SET_TOKEN', data.token)

  const done = _ =>
    window.location.reload(true)

  return Tokens
    .create(creds)
    .then(setToken)
    .then(done)
}

async function populateInitial (ctx) {
  const user = await ctx.dispatch('fetchCurrentUser')

  if (user.role === 'admin') {
    await ctx.dispatch('users/fetchAll')
  }

  await ctx.dispatch('txs/fetchAll')
  await ctx.dispatch('products/fetchAll')
  await ctx.dispatch('invoices/fetchAll')
  await ctx.dispatch('payments/fetchAll')
}

export {
  submitLogin,
  fetchCurrentUser,
  logoutCurrentUser,
  populateInitial
}
