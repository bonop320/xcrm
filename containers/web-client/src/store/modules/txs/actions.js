import { tap } from 'ramda'

import request from '@/services/request'

function fetchAll (ctx) {
  const commit = arr =>
    ctx.commit('SET_ALL', arr)

  return request
    .get('/txs')
    .then(res => res.data)
    .then(tap(commit))
}

function createOne (ctx, body) {
  const commit = data =>
    ctx.commit('PUT_ONE', data)

  return request
    .post('/txs', body)
    .then(res => res.data)
    .then(tap(commit))
}

export {
  fetchAll,
  createOne
}
