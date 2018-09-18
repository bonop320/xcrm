import { mapGetters } from 'vuex'

const getters = mapGetters({
  find: 'products/byId',
  agentOptions: 'users/allAgents',
  txsBy: 'txs/by',
  amountBy: 'txs/totalAmountBy'
})

function self () {
  return this.find(this._id)
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
  ...getters,
  self,
  txs,
  amount
}
