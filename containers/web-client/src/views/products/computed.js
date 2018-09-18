import {
  mapState,
  mapGetters
} from 'vuex'

const state = mapState('products', {
  members: 'raw'
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
