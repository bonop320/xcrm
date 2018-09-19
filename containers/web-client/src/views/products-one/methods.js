import { mapActions } from 'vuex'

const actions = mapActions({
  fetchById: 'fetchProductById',
  createTx: 'txs/createOne'
})

function submitTx (body) {
  const create = body =>
    this.createTx(body)

  const done = res => {
    const { amount, action } = res

    this.$notify({
      title: 'Transactions',
      message: `${amount} items ${action}ed`
    })

    this.openModal = null
  }

  return Promise
    .resolve(body)
    .then(create)
    .then(done)
}

export default {
  ...actions,
  submitTx
}
