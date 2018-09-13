import {
  mapGetters,
  mapState,
  mapActions
} from 'vuex'

import {
  find,
  propEq
} from 'ramda'

import ProductCard from '@/components/product-card'
import ProductTxTable from '@/components/product-tx-table'
import ProductTxForm from '@/components/product-tx-form'

const props = {
  _id: String
}

const computed = {
  imageUrl () {
    const { image = 'none.jpg' } = this.self
    return `/cdn/images/${image}`
  },
  ...mapState(['user']),
  ...mapGetters('products', { 'self': 'active' }),
  ...mapGetters('users', { 'agents': 'allAgents' })
}

const methods = mapActions('products', [
  'fetchOne',
  'createTx'
])

async function beforeMount () {
  await this.fetchOne(this._id)
}

export default {
  name: 'view-products-one',
  props,
  computed,
  components: {
    ProductCard,
    ProductTxTable,
    ProductTxForm
  },
  methods,
  beforeMount
}
