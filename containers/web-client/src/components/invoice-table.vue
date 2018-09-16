<template lang="pug">
el-card
  header(slot="header")
    | Invoices

  el-row(:gutter="20")
    el-table(:data="members")
      el-table-column(type="index")

      el-table-column(
        prop="book"
        label="Book")

      el-table-column(label="Product")
        template(slot-scope="scope")
          router-link(:to="{ name: 'view-products-one', params: { _id: scope.row.subject } }")
            | {{ scope.row.product.name }}

      el-table-column(
        prop="amount"
        label="Payable")

      el-table-column(
        prop="payed"
        label="Payed")

      el-table-column(label="Date")
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
  name: 'invoices-table',
  props,
  computed
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
