import {
  mapGetters,
  mapState,
  mapActions
} from 'vuex'

import {
  find,
  propEq,
  always
} from 'ramda'

import PaymentTable from '@/components/payment-table'
import PaymentForm from '@/components/payment-form'

import * as computed from './computed'
import * as methods from './methods'

const props = {
  _id: String
}

const data = always({
  displayPaymentDialog: false
})

export default {
  name: 'view-products-one',
  props,
  computed,
  data,
  components: {
    PaymentTable,
    PaymentForm
  },
  methods
}
