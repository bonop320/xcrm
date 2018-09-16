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
import TxTable from '@/components/tx-table'
import TxForm from '@/components/tx-form'

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
    TxTable,
    TxForm
  },
  methods,
  beforeMount
}
