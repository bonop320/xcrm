import {
  find,
  propEq
} from 'ramda'

const byId = (state) => {
  return _id => find(propEq('_id', _id), state.raw)
}

export {
  byId
}
