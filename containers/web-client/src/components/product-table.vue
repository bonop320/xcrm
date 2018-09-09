<template lang="pug">
el-row(:gutter="20")
  el-table(:data="members")
    el-table-column(
      prop="name"
      label="Name")

    el-table-column(
      prop="amount"
      label="Amount")
</template>

<script>
const props = {
  members: Array
}

export default {
  name: 'product-table',
  props
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
