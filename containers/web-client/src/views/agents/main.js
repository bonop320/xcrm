import { mapGetters } from 'vuex'

import AgentTable from '@/components/agent-table'
import AgentForm from '@/components/agent-form'

import * as methods from './methods'

const data = () => ({
  isCreating: false
})

const computed = mapGetters('users', {
  'agents': 'allAgents'
})

function mounted () {
  this.fetchAll()
}

export default {
  name: 'agents-view',
  data,
  computed,
  components: {
    AgentTable,
    AgentForm
  },
  methods,
  mounted
}
