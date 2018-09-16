import { mapGetters } from 'vuex'

import ProductList from '@/components/product-list'
import ProductForm from '@/components/product-form'

import * as methods from './methods'

const data = () => ({
  isCreating: false
})

const computed = mapGetters('products', {
  'products': 'complete'
})

function mounted () {
  this.fetchAll()
}

export default {
  name: 'view-products',
  data,
  computed,
  components: {
    ProductList,
    ProductForm
  },
  methods,
  mounted
}
