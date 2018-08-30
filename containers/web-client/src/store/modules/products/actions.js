import { tap } from 'ramda'

import { Products } from '@/services'

function fetchAll (ctx) {
  const commit = arr =>
    ctx.commit('SET_ALL', arr)

  return Products
    .fetchAll()
    .then(tap(commit))
}

function createOne (ctx, body) {
  const commit = data =>
    ctx.commit('PUT_ONE', data)

  return Products
    .createOne(body)
    .then(tap(commit))
}

function updateOne (ctx, body) {
  const commit = data =>
    ctx.commit('PUT_ONE', data)

  return Products
    .updateOne(body)
    .then(tap(commit))
}

export {
  fetchAll,
  createOne,
  updateOne
}
