import {
  tap,
  assoc
} from 'ramda'

import request from '@/services/request'

function fetchAll (ctx) {
  const commit = arr =>
    ctx.commit('SET_ALL', arr)

  return request
    .get('/products')
    .then(res => res.data)
    .then(tap(commit))
}

function fetchOne (ctx, product) {
  const _id = product._id || product

  const commit = arr =>
    ctx.commit('PUT_ONE', arr)

  const attachTxs = doc => {
    return request
      .get(`/products/${_id}/txs`)
      .then(res => res.data)
      .then(txs => assoc('txs', txs, doc))
  }

  return request
    .get(`/products/${_id}`)
    .then(res => res.data)
    .then(attachTxs)
    .then(tap(commit))
}

function createOne (ctx, body) {
  const commit = data =>
    ctx.commit('PUT_ONE', data)

  return request
    .post('/products', body)
    .then(res => res.data)
    .then(tap(commit))
}

function createTx (ctx, payload) {
  const { _id } = ctx.getters.active

  const url = `/products/${_id}/txs`

  const commit = res =>
    ctx.commit('PUT_TX', res)

  const reloadRepo = res =>
    ctx.dispatch('fetchCurrentUser', null, { root: true })

  return request
    .post(url, payload)
    .then(res => res.data)
    .then(tap(commit))
    .then(tap(reloadRepo))
}

export {
  fetchAll,
  fetchOne,
  createOne,
  createTx
}
