import {
  mapState,
  mapGetters
} from 'vuex'

const state = mapState({
  members: 'products'
})

const getters = mapGetters({
  totalAmountBy: 'txs/totalAmountBy'
})

function totalAmountOf () {
  return subject =>
    this.totalAmountBy({ subject })
}

export default {
  ...state,
  ...getters,
  totalAmountOf
}
