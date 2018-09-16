import {
  map,
  assoc,
  find,
  propEq
} from 'ramda'

const complete = (state, getters, rootState, rootGetters) => {
  const tagAmount = x => {
    const of = rootGetters['txs/amountFor']
    return assoc('amount', of(x._id), x)
  }

  return map(tagAmount, state.raw)
}

const byId = (state, getters) => {
  return _id => find(propEq('_id', _id), getters.complete)
}

export {
  complete,
  byId
}
