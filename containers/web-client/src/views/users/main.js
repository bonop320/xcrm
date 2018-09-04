import { mapGetters } from 'vuex'

import UserList from '@/components/user-list'
import UserForm from '@/components/user-form'

import * as methods from './methods'

const data = () => ({
  isCreating: false
})

const computed = mapGetters('users', {
  'users': 'all'
})

function mounted () {
  this.fetchAll()
}

export default {
  name: 'users-view',
  data,
  computed,
  components: {
    UserList,
    UserForm
  },
  methods,
  mounted
}
