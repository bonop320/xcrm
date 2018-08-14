import { mapGetters } from 'vuex'

import ProductList from '@/components/product-list'
import ProductFormFields from '@/components/product-fieldset'

import * as methods from './methods'

const data = () => ({
  isCreating: false,
  nextProduct: {}
})

const computed = mapGetters('products', {
  'products': 'all'
})

function mounted () {
  this.$store.dispatch('products/fetchAll')
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
