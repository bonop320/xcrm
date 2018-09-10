<template lang="pug">
div
  h1 Repository

  el-tabs(
    tabPosition="left"
    v-model="activeTab")

    el-tab-pane(
      label="Products"
      name="products")

      product-table(
        :members="products"
        @transaction="handleTransaction")

    el-tab-pane(
      label="Transactions"
      name="transactions")

      product-tx-table(:members="txs")
</template>

<script src="./main.js"></script>

<style scoped>
.control-toolbar {
  margin: 10px 0 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  text-align: right;
}
</style>
