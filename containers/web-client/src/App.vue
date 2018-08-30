<template lang="pug">
el-container#app
  el-main(v-if="user")
    router-view
  login-view(v-else)
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

import LoginView from '@/views/login'

const computed = mapState(['token', 'user'])

const methods = mapActions(['fetchCurrentUser'])

function beforeMount () {
  if (this.token) {
    this.fetchCurrentUser()
  }
}

export default {
  name: 'app',
  computed,
  components: {
    LoginView
  },
  methods,
  beforeMount
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 960px;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
}

h1, h2 {
  font-weight: normal;
}

</style>
