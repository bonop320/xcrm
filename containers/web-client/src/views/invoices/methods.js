import { mapActions } from 'vuex'

const actions = mapActions('invoices', [
  'fetchAll'
])

export default {
  ...actions
}
