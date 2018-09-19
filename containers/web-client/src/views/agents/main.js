import { mapState } from 'vuex'

import AgentTable from '@/components/agent-table'
import AgentForm from '@/components/agent-form'

import methods from './methods'

const data = () => ({
  isCreating: false
})

const computed = mapState(['agents'])

function mounted () {
  this.fetchAgents()
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
