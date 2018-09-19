import {
  mapState,
  mapGetters
} from 'vuex'

const state = mapState({
  agentOptions: 'agents'
})

const getters = mapGetters({
  byId: 'productById',
  txsBy: 'txs/by',
  amountBy: 'txs/totalAmountBy'
})

function self () {
  return this.byId(this._id)
}

function amount () {
  const subject = this._id
  return this.amountBy({ subject })
}

function txs () {
  const subject = this._id
  return this.txsBy({ subject })
}

export default {
  ...state,
  ...getters,
  self,
  txs,
  amount
}
