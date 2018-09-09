import { mapGetters } from 'vuex'

import ProductTable from '@/components/product-table'

import * as methods from './methods'

const data = () => ({
  isCreating: false
})

const computed = mapGetters('repository', {
  'products': 'all'
})

function mounted () {
  this.fetchOne()
}

export default {
  name: 'view-repo',
  data,
  computed,
  components: {
    ProductTable
  },
  methods,
  mounted
}
