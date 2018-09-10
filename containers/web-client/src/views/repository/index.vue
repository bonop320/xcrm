<template lang="pug">
div
  el-dialog(
    v-if="txModalVisible && products"
    :visible.sync="txModalVisible"
    @closed="closeTxModal")

    product-tx-form(
      v-if="products && agents"
      :subject="activeTxSubject"
      :products="products"
      :agents="agents"
      @submit="submitTxCreate")

  product-table(
    v-if="products"
    :members="products"
    @action="openTxModalFor")
</template>

<script src="./main.js"></script>
