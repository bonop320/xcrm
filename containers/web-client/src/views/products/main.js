import { mapState } from 'vuex'

import ProductList from '@/components/product-list'

const computed = mapState(['products'])

export default {
  name: 'ViewProducts',
  computed,
  components: {
    ProductList
  }
}
