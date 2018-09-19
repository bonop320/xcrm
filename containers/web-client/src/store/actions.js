import {
  tap
} from 'ramda'

import request from '@/services/request'

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

  return request
    .post('/tokens', creds)
    .then(setToken)
    .then(done)
}

async function populateInitial (ctx) {
  const { user } = ctx.state

  if (user.role === 'admin') {
    await ctx.dispatch('fetchAgents')
  }

  await ctx.dispatch('products/fetchAll')

  await ctx.dispatch('txs/fetchAll')
  await ctx.dispatch('invoices/fetchAll')
  await ctx.dispatch('payments/fetchAll')
}

function fetchAgents (ctx, query = {}) {
  const commit = arr =>
    ctx.commit('SET_AGENTS', arr)

  return request
    .get('/users')
    .then(res => res.data)
    .then(tap(commit))
}

function fetchAgentById (ctx, product) {
  const _id = product._id || product

  const commit = arr =>
    ctx.commit('PUT_AGENT', arr)

  return request
    .get(`/users/${_id}`)
    .then(res => res.data)
    .then(tap(commit))
}

function createAgent (ctx, body) {
  const commit = data =>
    ctx.commit('PUT_AGENT', data)

  return request
    .post('/users', body)
    .then(res => res.data)
    .then(tap(commit))
}

function fetchProducts (ctx, query = {}) {
  const commit = arr =>
    ctx.commit('SET_PRODUCTS', arr)

  return request
    .get('/products')
    .then(res => res.data)
    .then(tap(commit))
}

function fetchProductById (ctx, product) {
  const _id = product._id || product

  const commit = arr =>
    ctx.commit('PUT_PRODUCT', arr)

  return request
    .get(`/products/${_id}`)
    .then(res => res.data)
    .then(tap(commit))
}

function createProduct (ctx, body) {
  const commit = data =>
    ctx.commit('PUT_PRODUCT', data)

  return request
    .post('/products', body)
    .then(res => res.data)
    .then(tap(commit))
}

export {
  submitLogin,
  logoutCurrentUser,
  populateInitial,
  fetchProducts,
  fetchProductById,
  createProduct,
  fetchAgents,
  fetchAgentById,
  createAgent
}
