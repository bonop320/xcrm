<template lang="pug">
el-row(:gutter="20")
  el-table(:data="members")
    el-table-column(type="index")

    el-table-column(
      prop="_id"
      label="Id")

    el-table-column(
      prop="amount"
      label="Amount")

    el-table-column(
      prop="action"
      label="Action")

    el-table-column(
      prop="target"
      label="Target")

    el-table-column(label="Last updated")
      template(slot-scope="scope")
        time(:title="lastTimeOfToNow(scope.row)")
          | {{ lastTimeOf(scope.row) }}

</template>

<script>
import {
  format,
  distanceInWordsToNow
} from 'date-fns'

const computed = {
  lastTimeOf () {
    return tx => format(tx.time, 'MM/DD HH:mm')
  },
  lastTimeOfToNow () {
    return tx => distanceInWordsToNow(tx.time)
  }

}

const props = {
  members: Array
}

export default {
  name: 'product-tx-table',
  props,
  computed
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
