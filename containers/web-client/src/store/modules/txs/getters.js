import {
  compose,
  filter,
  whereEq,
  groupBy,
  prop,
  map,
  reduce
} from 'ramda'

import {
  contained
} from 'ramda-adjunct'

const by = state => {
  return query => filter(whereEq(query), state.raw)
}

const totalAmountBy = (state, getters) => {
  const isOutgoing = contained([
    'remove',
    'transfer'
  ])

  const sum = (acc, { action, amount }) => {
    const delta = isOutgoing(action)
      ? -amount
      : amount

    return acc + delta
  }

  return compose(
    reduce(sum, 0),
    getters.by
  )
}

const bySubject = state =>
  groupBy(prop('subject'), state.raw)

const bySubjectOf = (state, getters) => {
  return id => prop(id, getters.bySubject)
}

const amountsBySubject = (state, getters) => {
  const isOutgoing = contained([
    'remove',
    'transfer'
  ])

  const total = (t, { action, amount }) => {
    const d = isOutgoing(action) ? -amount : amount
    return t + d
  }

  return map(reduce(total, 0), getters.bySubject)
}

const amountFor = (state, getters) => {
  return id => prop(id, getters.amountsBySubject) || 0
}

export {
  by,
  totalAmountBy,
  bySubject,
  bySubjectOf,
  amountsBySubject,
  amountFor
}
