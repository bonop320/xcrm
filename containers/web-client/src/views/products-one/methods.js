import { assoc } from 'ramda'

import { mapActions } from 'vuex'

const { fetchOne } = mapActions('products', [
  'fetchOne'
])

function openTxDialog () {
  this.displayTxDialog = true
}

function createTx (body) {
  const tagSubject = assoc('subject', this._id)

  const create = body =>
    this.$store.dispatch('txs/createOne', body)

  const done = res => {
    const { amount, action, price } = res

    this.$notify({
      title: 'Transactions',
      message: `${amount} items ${action}ed`
    })

    if (action === 'transfer') {
      this.$notify({
        title: 'Invoices',
        message: `Invoice for ${amount * price} created`
      })
    }

    this.displayTxDialog = false
  }

  return Promise
    .resolve(body)
    .then(tagSubject)
    .then(create)
    .then(done)
}

export {
  openTxDialog,
  createTx,
  fetchOne
}
