import { mapActions } from 'vuex'

import { assoc } from 'ramda'

const { createTx } = mapActions('repo', [ 'createTx' ])

function submitTx (payload) {
  const body = assoc('subject', this._id, payload)

  this
    .createTx(body)
    .then(console.log)
}

export {
  submitTx,
  createTx
}
