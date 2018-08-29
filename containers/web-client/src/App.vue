<template lang="pug">
el-container#app
  login-view(v-if="noUser")
  el-main(v-else)
    router-view
</template>

<script>
import LoginView from '@/views/login'

const computed = {
  noUser () {
    return !this.$store.state.user
  }
}

export default {
  name: 'app',
  computed,
  components: {
    LoginView
  }
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
