<template lang="pug">
div
  el-container#app(v-if="isReady")
    el-main(v-if="user")
      app-header(
        :user="user"
        @logout="logoutCurrentUser")
      router-view
    login-view(v-else)
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

import AppHeader from '@/components/app-header'

import LoginView from '@/views/login'

const data = _ => ({
  isReady: false
})

const computed = mapState(['token', 'user'])

const methods = mapActions([
  'populateInitial',
  'logoutCurrentUser'
])

function beforeMount () {
  const setReady = _ => {
    this.isReady = true
  }

  if (!this.user) return setReady()

  this
    .populateInitial()
    .then(setReady)
}

export default {
  name: 'app',
  computed,
  data,
  components: {
    AppHeader,
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
  margin-left: auto;
  margin-right: auto;
}

h1, h2 {
  font-weight: normal;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

</style>
