import { always } from 'ramda'

import components from './components'
import computed from './computed'
import methods from './methods'

const props = {
  _id: String
}

const data = always({
  openModal: null
})

async function beforeMount () {
  await this.fetchById(this._id)
}

export default {
  name: 'view-products-one',
  props,
  computed,
  data,
  components,
  methods,
  beforeMount
}
