import { mapState } from 'vuex'

const computed = mapState(['products'])

export default {
  name: 'ViewProducts',
  computed
}
