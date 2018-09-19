import InvoiceTable from '@/components/invoice-table'

import methods from './methods'
import computed from './computed'

export default {
  name: 'invoices-view',
  computed,
  components: {
    InvoiceTable
  },
  methods
}
