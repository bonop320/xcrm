import { mapGetters } from 'vuex'

import ProductTable from '@/components/product-table'
import ProductTxTable from '@/components/product-tx-table'
import ProductTxForm from '@/components/product-tx-form'

import * as methods from './methods'

const data = () => ({
  activeTab: 'products',
  txModalVisible: false,
  activeTxSubject: null
})

const computed = {
  ...mapGetters('repository', {
    'products': 'products',
    'txs': 'txs'
  }),
  ...mapGetters('users', {
    'agents': 'allAgents'
  })
}

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
    ProductTxTable,
    ProductTxForm
  },
  methods,
  mounted
}
