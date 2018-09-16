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

import * as computed from './computed'
import * as methods from './methods'

const props = {
  _id: String
}

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
