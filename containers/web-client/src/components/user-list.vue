<template lang="pug">
el-row(:gutter="20")
  el-table(:data="members")
    el-table-column(
      prop="phone"
      label="Phone")

    el-table-column(
      prop="name"
      label="Name")
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
