import {
  groupBy,
  prop,
  map,
  reduce
} from 'ramda'

import {
  contained
} from 'ramda-adjunct'

const bySubject = state =>
  groupBy(prop('subject'), state.raw)

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
  bySubject,
  amountsBySubject,
  amountFor
}
