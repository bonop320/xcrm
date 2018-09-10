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

</template>

<script>
import { stubArray } from 'ramda-adjunct'

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
  methods
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
