import {
  tap
} from 'ramda'

import {
  putIn,
  findIn
} from '@/store/db'

function fetchAll (ctx) {
  const commit = arr =>
    ctx.commit('SET_ALL', arr)

  return findIn('txs', {})
    .then(tap(commit))
}

function createOne (ctx, body) {
  const commit = data =>
    ctx.commit('PUT_ONE', data)

  return putIn('txs', body)
    .then(tap(commit))
}

export {
  fetchAll,
  createOne
}
