import {
  mapGetters,
  mapState
} from 'vuex'

import {
  find,
  propEq
} from 'ramda'

import ProductCard from '@/components/product-card'
import ProductTxTable from '@/components/product-tx-table'
import ProductTxForm from '@/components/product-tx-form'

import * as methods from './methods'

const props = {
  _id: String
}

const data = () => ({
  txModalVisible: false
})

const computed = {
  self () {
    const byId = propEq('_id', this._id)
    return find(byId, this.products)
  },
  txs () {
    return this.txsBySubject[this._id]
  },
  imageUrl () {
    const { image = 'none.jpg' } = this.self
    return `/cdn/images/${image}`
  },
  ...mapState(['user']),
  ...mapGetters('repo', [ 'txsBySubject', 'products' ]),
  ...mapGetters('users', { 'agents': 'allAgents' })
}

export default {
  name: 'view-repo',
  props,
  data,
  computed,
  components: {
    ProductCard,
    ProductTxTable,
    ProductTxForm
  },
  methods
}
