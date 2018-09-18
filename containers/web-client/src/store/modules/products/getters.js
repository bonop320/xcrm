import {
  find,
  whereEq
} from 'ramda'

const byId = (state, getters) => {
  return _id => find(whereEq({ _id }), state.raw)
}

export {
  byId
}
