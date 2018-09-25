import {
  tap
} from 'ramda'

import request from './request'

function logoutCurrentUser (store) {
  store.commit('DEL_USER')
  store.commit('DEL_TOKEN')

  window.location.reload(true)
}

function submitLogin (store, creds) {
  const setToken = data => {
    store.commit('SET_TOKEN', data.token)
  }

  const done = _ =>
    window.location.reload(true)

  return request
    .post('/tokens', creds)
    .then(res => res.data)
    .then(setToken)
    .then(done)
}

async function populateInitial (store) {
  const { user } = store.state

  if (user.role === 'admin') {
    await store.dispatch('fetchAgents')
  }

  await store.dispatch('fetchProducts')

  await store.dispatch('txs/fetchAll')
}

function fetchAgents (store, query = {}) {
  const commit = arr =>
    store.commit('SET_AGENTS', arr)

  return request
    .get('/users')
    .then(res => res.data)
    .then(tap(commit))
}

function fetchAgentById (store, product) {
  const _id = product._id || product

  const commit = arr =>
    store.commit('PUT_AGENT', arr)

  return request
    .get(`/users/${_id}`)
    .then(res => res.data)
    .then(tap(commit))
}

function createAgent (store, body) {
  const commit = data =>
    store.commit('PUT_AGENT', data)

  return request
    .post('/users', body)
    .then(res => res.data)
    .then(tap(commit))
}

function fetchProducts (store, query = {}) {
  const commit = arr =>
    store.commit('SET_PRODUCTS', arr)

  return request
    .get('/products')
    .then(res => res.data)
    .then(tap(commit))
}

function fetchProductById (store, product) {
  const _id = product._id || product

  const commit = arr =>
    store.commit('PUT_PRODUCT', arr)

  return request
    .get(`/products/${_id}`)
    .then(res => res.data)
    .then(tap(commit))
}

function createProduct (store, body) {
  const commit = data =>
    store.commit('PUT_PRODUCT', data)

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
