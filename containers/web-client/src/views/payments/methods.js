// import { assoc } from 'ramda'

// import { mapActions } from 'vuex'

function openPaymentDialog () {
  this.displayPaymentDialog = true
}

function createPayment (body) {
  const create = body =>
    this.$store.dispatch('payments/createOne', body)

  const done = res => {
    this.$notify({
      title: 'Payment',
      message: `Payment filled`
    })

    this.displayPaymentDialog = false
  }

  return Promise
    .resolve(body)
    .then(create)
    .then(done)
}

export {
  openPaymentDialog,
  createPayment
}
