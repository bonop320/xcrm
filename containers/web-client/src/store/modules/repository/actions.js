import {
  tap,
  map,
  assoc
} from 'ramda'

import request from '@/services/request'

function fetchRepo (ctx) {
  const { user } = ctx.rootState

  const commit = products =>
    ctx.commit('SET_PRODUCTS', products)

  const assocAmounts = products => {
    const setAmounts = xMap => {
      const it = product => {
        const amount = xMap[product._id] || 0
        return assoc('amount', amount, product)
      }

      return map(it, products)
    }

    const url = `/repos/${user._id}`

    return request
      .get(url)
      .then(res => res.data)
      .then(setAmounts)
  }

  return ctx
    .dispatch('products/fetchAll', void 0, { root: true })
    .then(assocAmounts)
    .then(tap(commit))
}

function fetchTransactions (ctx) {
  const { user } = ctx.rootState

  const commit = txs =>
    ctx.commit('SET_TRANSACTIONS', txs)

  const url = `/repos/${user._id}/transactions`

  return request
    .get(url)
    .then(res => res.data)
    .then(commit)
}

function createTransaction (ctx, payload) {
  const { user } = ctx.rootState

  const url = `/repos/${user._id}/transactions`

  return request
    .post(url, payload)
    .then(res => res.data)
}

export {
  fetchRepo,
  fetchTransactions,
  createTransaction
}
