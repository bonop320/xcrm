<template lang="pug">
el-table(
  :data="members"
  :default-sort="defaultSort")

  el-table-column(type="index")

  el-table-column(
    prop="book"
    label="Book")
    <!-- template(slot-scope="scope") -->
    <!--   span {{ scope.row.agent.name }} -->

  el-table-column(
    prop="subject"
    label="Product")
    <!-- template(slot-scope="scope") -->
    <!--   router-link(:to="{ name: 'view-products-one', params: { _id: scope.row.subject } }") -->
    <!--     span {{ scope.row.product.name }} -->

  el-table-column(
    align="right"
    prop="amount"
    label="Amount")

  el-table-column(
  align="right"
    prop="price"
    label="Price")

  el-table-column(
  align="right"
    prop="total"
    label="Total")

  el-table-column(
    prop="time"
    label="Date"
    align="right"
    :sortable="true")

    template(slot-scope="scope")
      time(:title="lastTimeOfToNow(scope.row)")
        | {{ lastTimeOf(scope.row) }}

</template>

<script>
import {
  always
} from 'ramda'

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

const data = always({
  defaultSort: {
    prop: 'time',
    order: 'ascending'
  }
})

export default {
  name: 'invoices-table',
  props,
  data,
  computed
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
