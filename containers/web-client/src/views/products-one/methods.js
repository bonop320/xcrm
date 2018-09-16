import { assoc } from 'ramda'

import { mapActions } from 'vuex'

const { fetchOne } = mapActions('products', [
  'fetchOne'
])

function createTx (body) {
  const tagSubject = assoc('subject', this._id)

  const create = body =>
    this.$store.dispatch('txs/createOne', body)

  return Promise
    .resolve(body)
    .then(tagSubject)
    .then(create)
}

export {
  createTx,
  fetchOne
}
