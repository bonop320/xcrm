import {
  compose,
  map,
  assoc,
  find,
  propEq,
  filter
} from 'ramda'

const complete = (state, getters, rootState, rootGetters) => {
  const tagAgent = x => {
    const of = rootGetters['users/byId']
    return assoc('agent', of(x.book), x)
  }

  const tagProduct = x => {
    const of = rootGetters['products/byId']
    return assoc('product', of(x.subject), x)
  }

  const tag = compose(tagAgent, tagProduct)

  return map(tag, state.raw)
}

const byBookOf = (state, getters) => {
  return id => filter(propEq('book', id), getters.complete)
}

const byId = (state, getters) => {
  return _id => find(propEq('_id', _id), getters.complete)
}

export {
  complete,
  byId,
  byBookOf
}
