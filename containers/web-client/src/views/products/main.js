import { mapGetters } from 'vuex'

import ProductList from '@/components/product-list'

const computed = mapGetters('products', {
  'products': 'all'
})

function mounted () {
  this.$store.dispatch('products/fetchAll')
}

export default {
  name: 'ViewProducts',
  computed,
  components: {
    ProductList
  },
  mounted
}
