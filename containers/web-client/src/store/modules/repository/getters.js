import {
  prop,
  compose,
  map,
  assoc,
  groupBy
} from 'ramda'

const txsBySubject = state => {
  return groupBy(prop('subject'), state.txs)
}

const products = (state, getters, rootState, rootGetters) => {
  const { agg } = state
  const { txsBySubject } = getters

  const products = rootGetters['products/all']

  const tagAmount = product => {
    const amount = agg[product._id]
    return assoc('amount', amount, product)
  }

  const tagTxs = product => {
    const txs = txsBySubject[product._id] || []
    return assoc('txs', txs, product)
  }

  return map(compose(tagTxs, tagAmount), products)
}

export {
  products,
  txsBySubject
}
