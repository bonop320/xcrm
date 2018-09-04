<template lang="pug">
el-row(:gutter="20")
  el-col(v-for="user in members"
    :key="user._id"
    :span="8")
      | {{ user.name }}
</template>

<script>
const props = {
  members: Array
}

export default {
  name: 'user-list',
  props
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
