import {
  tap,
  map,
  assoc
} from 'ramda'

import request from '@/services/request'

function fetchOne (ctx) {
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

export {
  fetchOne
}
