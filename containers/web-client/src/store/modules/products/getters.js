import {
  compose,
  assoc,
  map,
  values,
  find,
  propEq
} from 'ramda'

const active = (state, getters, rootState) => {
  const { _id } = rootState.route.params
  return find(propEq('_id', _id), getters.all)
}

const all = (state, getters, rootState) => {
  const { repo } = rootState.user

  const tagAmount = x => {
    const amount = repo[x._id] || 0
    return assoc('amount', amount, x)
  }

  const parse = compose(
    map(tagAmount),
    values
  )

  return parse(state)
}

export {
  active,
  all
}
