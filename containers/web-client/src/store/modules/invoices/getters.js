import {
  find,
  propEq,
  filter
} from 'ramda'

const byBookOf = (state, getters) => {
  return id => filter(propEq('book', id), state.raw)
}

const byId = (state, getters) => {
  return _id => find(propEq('_id', _id), state.raw)
}

export {
  byId,
  byBookOf
}
