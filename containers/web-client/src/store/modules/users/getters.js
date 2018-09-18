import {
  prop,
  reduce,
  map,
  assoc,
  values,
  filter,
  propEq,
  compose
} from 'ramda'

const all = values

const byId = (state) => {
  return id => {
    console.log(id, state)
    return prop(id, state)
  }
}

const allAgents = (state, getters, rootState, rootGetters) => {
  const invoicesOf = rootGetters['invoices/byBookOf']
  const agentsOnly = filter(propEq('role', 'agent'))

  const tagInvoices = x =>
    assoc('invoices', invoicesOf(x._id), x)

  const tagTotalPayable = x => {
    const sum = (a, { total }) => a + total
    const total = reduce(sum, 0, x.invoices)
    return assoc('totalPayable', total, x)
  }

  const get = compose(
    map(tagTotalPayable),
    map(tagInvoices),
    agentsOnly
  )

  return get(getters.all)
}

export {
  all,
  allAgents,
  byId
}
