<template lang="pug">
el-row(:gutter="20")
  el-table(:data="members")
    el-table-column(
      prop="_id"
      label="Id")

    el-table-column(
      prop="amount"
      label="Amount")

    el-table-column(
      prop="name"
      label="Product Name")
</template>

<script>
const props = {
  members: Array
}

export default {
  name: 'product-tx-table',
  props
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
