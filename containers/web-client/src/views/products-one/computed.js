import { mapGetters } from 'vuex'

const getters = mapGetters({
  agentOptions: 'users/allAgents'
})

function self () {
  const { getters } = this.$store

  const byId = getters['products/byId']
  return byId(this._id)
}

function txs () {
  const { getters } = this.$store

  const txsBy = getters['txs/bySubjectOf']
  return txsBy(this._id)
}

export default {
  self,
  txs,
  ...getters
}
