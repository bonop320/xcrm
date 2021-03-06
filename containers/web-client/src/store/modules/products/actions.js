import {
  tap
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

  return request
    .get(`/products/${_id}`)
    .then(res => res.data)
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

export {
  fetchAll,
  fetchOne,
  createOne
}
