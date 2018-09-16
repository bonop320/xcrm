import { mapGetters } from 'vuex'

import InvoiceTable from '@/components/invoice-table'

import * as methods from './methods'

const computed = mapGetters('invoices', {
  'invoices': 'complete'
})

export default {
  name: 'invoices-view',
  computed,
  components: {
    InvoiceTable
  },
  methods
}
