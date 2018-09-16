import { assoc } from 'ramda'

import { mapState, mapGetters } from 'vuex'

const { user } = mapState(['user'])

const { agents } = mapGetters('users', {
  'agents': 'allAgents'
})

function self () {
  const { _id } = this
  const { getters } = this.$store

  const byId = getters['products/byId']
  const txsBySubject = getters['txs/bySubjectOf']

  return assoc('txs', txsBySubject(_id), byId(_id))
}

function imageUrl () {
  const { image = 'none.jpg' } = this.self
  return `/cdn/images/${image}`
}

export {
  user,
  agents,
  self,
  imageUrl
}
