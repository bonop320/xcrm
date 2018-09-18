import { mapActions } from 'vuex'

const { fetchAll } = mapActions('invoices', [
  'fetchAll'
])

export {
  fetchAll
}
