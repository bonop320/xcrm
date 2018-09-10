<template lang="pug">
el-row(:gutter="20")
  el-table(:data="members")
    el-table-column(
      prop="name"
      label="Name")

    el-table-column(
      prop="amount"
      label="Amount")

    el-table-column(
      label="Actions")

      template(slot-scope="scope")
        el-button(
          size="mini"
          @click="emitAction(scope.$index)")

          | Edit {{ scope.$index }}

    el-table-column(type="expand")
      template(slot-scope="props")
        product-tx-table(:members="props.row.txs")

</template>

<script>
import { stubArray } from 'ramda-adjunct'

import ProductTxTable from './product-tx-table'

const props = {
  members: {
    type: Array,
    default: stubArray
  }
}

const methods = {
  emitAction (i) {
    const product = this.members[i]
    this.$emit('action', product)
  }
}

export default {
  name: 'product-table',
  props,
  methods,
  components: {
    ProductTxTable
  }
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
