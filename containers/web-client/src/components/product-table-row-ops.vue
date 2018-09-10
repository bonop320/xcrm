<template lang="pug">
div
  el-button(@click="openManageDialog")
    | Manage

  el-button(@click="openTransferDialog")
    | Transfer

  el-dialog(:visible.sync="transferDialogVisible"
    title="Transfer to agent")

    el-form(:model="form")
      el-form-item(label="Agent")
        el-select(v-model="form.target")
          el-option(
            label="Exo"
            value="055")
          el-option(
            label="Exsso"
            value="055")
      el-form-item(label="Amount")
        el-input(type="number"
          v-model="form.amount")

</template>

<script>
const props = {
  row: String
}

const data = () => ({
  manageDialogVisible: false,
  transferDialogVisible: false,
  form: {}
})

const methods = {
  openManageDialog () {
    this.manageDialogVisible = true
  },
  openTransferDialog () {
    this.transferDialogVisible = true
  }
}

export default {
  name: 'product-table-row-ops',
  props,
  data,
  methods
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
