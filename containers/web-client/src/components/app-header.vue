<template lang="pug">
header.clearfix
  el-row
    el-col(:span="16")
      ul.nav
        li.nav-item
          router-link(to="/repository")
            | Repository
        li.nav-item
          router-link(to="/accounting")
            | Accounting
        li.nav-item
          router-link(to="/products")
            | Products
        li.nav-item(v-if="isAdmin")
          router-link(to="/users")
            | Users

    el-col.user-info(:span="8")
      el-dropdown(@command="handleCommand")
        strong
          | {{ user.name }}
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(command="logout")
            | Logout

</template>

<script>

const props = {
  user: Object
}

const computed = {
  isAdmin () {
    const { role } = this.user
    return role === 'admin'
  }
}

const methods = {
  handleCommand (cmd) {
    if (cmd === 'logout') {
      this.$emit('logout')
    }
  }
}

export default {
  name: 'app-header',
  props,
  computed,
  methods
}
</script>

<style scoped>
.nav {
  padding-left: 0;
  margin-left: -10px;
}

.nav-item {
  display: inline-block;
  margin: 0 10px;
}

.user-info {
  margin-top: 10px;
  text-align: right;
}
</style>
