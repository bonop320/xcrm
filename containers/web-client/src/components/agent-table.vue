<template lang="pug">
el-table(:data="members")
  el-table-column(
    prop="_id"
    label="User ID")

  el-table-column(
    prop="name"
    label="Name")

  el-table-column(
    prop="phone"
    label="Phone")

  el-table-column(
    align="right"
    prop="totalPayable"
    label="Total Receivable")
</template>

<script>
const props = {
  members: Array
}

export default {
  name: 'agent-table',
  props
}
</script>
