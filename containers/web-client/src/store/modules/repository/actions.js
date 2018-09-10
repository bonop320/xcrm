import {
  tap
} from 'ramda'

import request from '@/services/request'

function fetchRepo (ctx) {
  const { user } = ctx.rootState

  const commit = agg =>
    ctx.commit('SET_AGG', agg)

  const fetchRepo = () => {
    const url = `/repos/${user._id}`

    return request
      .get(url)
      .then(res => res.data)
  }

  return ctx
    .dispatch('products/fetchAll', void 0, { root: true })
    .then(fetchRepo)
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

  const commit = res =>
    ctx.commit('PUT_TRANSACTION', res)

  const applyCommit = res => {
    const [ repo ] = res.repos
    ctx.commit('SET_AGG', repo)
  }

  return request
    .post(url, payload)
    .then(res => res.data)
    .then(tap(commit))
    .then(tap(applyCommit))
}

export {
  fetchRepo,
  fetchTransactions,
  createTransaction
}
