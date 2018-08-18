import { mapGetters } from 'vuex'

import ProductList from '@/components/product-list'
import ProductForm from '@/components/product-form'

import * as methods from './methods'

const data = () => ({
  isCreating: false
})

const computed = mapGetters('products', {
  'products': 'all'
})

function mounted () {
  this.fetchAll()
}

export default {
  name: 'ViewProducts',
  data,
  computed,
  components: {
    ProductList,
    ProductForm
  },
  methods,
  mounted
}
