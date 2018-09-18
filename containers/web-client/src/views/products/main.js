import { always } from 'ramda'

import ProductList from '@/components/product-list'
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
    ProductList,
    ProductManageForm
  },
  methods,
  mounted
}
