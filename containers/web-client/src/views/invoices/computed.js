import {
  map,
  compose,
  assoc
} from 'ramda'

import {
  mapGetters,
  mapState
} from 'vuex'

const state = mapState('invoices', {
  invoices: 'raw'
})

const getters = mapGetters([
  'agentById',
  'productById'
])

function members () {
  const tagProduct = m => {
    return assoc('product', { name: 'exo' }, m)
  }

  const tagAgent = m => {
    const agent = this.agentById(m.book)
    return assoc('agent', agent, m)
  }

  const tag = compose(tagProduct, tagAgent)

  return map(tag, this.invoices)
}

function mounted () {
  this
    .fetchAll()
    .then(console.log)
}

export default {
  ...state,
  ...getters,
  members,
  mounted
}
