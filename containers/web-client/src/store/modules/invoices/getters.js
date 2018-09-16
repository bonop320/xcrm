import {
  compose,
  map,
  assoc,
  find,
  propEq
} from 'ramda'

const complete = (state, getters, rootState, rootGetters) => {
  const tagProduct = x => {
    const of = rootGetters['products/byId']
    return assoc('product', of(x.subject), x)
  }

  const tagPayed = x => {
    // const of = rootGetters['products/byId']
    return assoc('payed', 0, x)
  }

  const tag = compose(tagProduct, tagPayed)

  return map(tag, state.raw)
}

const byId = (state, getters) => {
  return _id => find(propEq('_id', _id), getters.complete)
}

export {
  complete,
  byId
}
