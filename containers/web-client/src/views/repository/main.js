import { mapGetters } from 'vuex'

import ProductTable from '@/components/product-table'
import ProductTxTable from '@/components/product-tx-table'

import * as methods from './methods'

const data = () => ({
  activeTab: 'products'
})

const computed = mapGetters('repository', [
  'products', 'txs'
])

async function mounted () {
  await this.fetchRepo()
  await this.fetchTransactions()
}

export default {
  name: 'view-repo',
  data,
  computed,
  components: {
    ProductTable,
    ProductTxTable
  },
  methods,
  mounted
}
