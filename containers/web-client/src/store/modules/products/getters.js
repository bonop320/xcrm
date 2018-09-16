import {
  map,
  assoc,
  find,
  propEq
} from 'ramda'

const active = (state, getters, rootState) => {
  const { _id } = rootState.route.params || {}
  return find(propEq('_id', _id), getters.complete)
}

const complete = (state, getters, rootState, rootGetters) => {
  const tagAmount = x => {
    const of = rootGetters['txs/amountFor']
    return assoc('amount', of(x._id), x)
  }

  return map(tagAmount, state.raw)
}

export {
  active,
  complete
}
