import {
  prop,
  compose,
  map,
  assoc,
  groupBy,
  filter,
  identity
} from 'ramda'

const txsBySubject = state => {
  return groupBy(prop('subject'), state.txs)
}

const products = (state, getters, rootState, rootGetters) => {
  const { agg } = state
  const { txsBySubject } = getters
  const { user } = rootState

  const allProducts = rootGetters['products/all']

  const tagAmount = product => {
    const amount = agg[product._id]
    return assoc('amount', amount, product)
  }

  const tagTxs = product => {
    const txs = txsBySubject[product._id] || []
    return assoc('txs', txs, product)
  }

  const tag = compose(tagTxs, tagAmount)

  const isAvailable = product => {
    const { _id } = product
    return agg[_id]
  }

  const products = user && user.role === 'admin'
    ? allProducts
    : filter(isAvailable, allProducts)

  return map(tag, products)
}

export {
  products,
  txsBySubject
}
