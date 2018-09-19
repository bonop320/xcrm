import {
  find,
  propEq
} from 'ramda'

// getters

const agentById = (state) => {
  return _id => find(propEq('_id', _id), state.agents)
}

const productById = (state) => {
  return _id => find(propEq('_id', _id), state.products)
}

export {
  agentById,
  productById
}
