import {
  tap
} from 'ramda'

import request from '@/services/request'

function createOne (ctx, body) {
  const commit = body =>
    ctx.commit('PUT_ONE', body)

  return request
    .post('/payments', body)
    .then(res => res.data)
    .then(tap(commit))
}

function fetchAll (ctx) {
  const commit = arr =>
    ctx.commit('SET_ALL', arr)

  return request
    .get('/payments')
    .then(res => res.data)
    .then(tap(commit))
}

export {
  fetchAll,
  createOne
}
