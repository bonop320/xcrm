import { mapGetters } from 'vuex'

import ProductList from '@/components/product-list'
import ProductFormFields from '@/components/product-form-fields'

import * as methods from './methods'

const data = () => ({
  isCreating: false,
  isUpdating: false,
  activeProduct: {}
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
    ProductFormFields
  },
  methods,
  mounted
}
