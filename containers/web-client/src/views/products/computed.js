import { mapGetters } from 'vuex'

const getters = mapGetters({
  products: 'products/complete'
})

function members () {
  return this.products
}

export default {
  ...getters,
  members
}

