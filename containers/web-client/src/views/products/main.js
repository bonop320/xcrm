import { always } from 'ramda'

import ProductCard from '@/components/product-card'
import ProductManageForm from '@/components/product-manage-form'

import methods from './methods'
import computed from './computed'

const data = always({
  openModal: null
})

function mounted () {
  this.fetchAll()
}

export default {
  name: 'view-products',
  data,
  computed,
  components: {
    ProductCard,
    ProductManageForm
  },
  methods,
  mounted
}
