<template lang="pug">
div(v-if="self")
  el-row(:gutter="20")

    el-col(:span="8")
      product-card(:params="self")

      product-tx-form.space-top(
        :role="user.role"
        :agents="agents"
        @submit="createTx")

    el-col(:span="16")
      product-tx-table(:members="self.txs")

</template>

<script src="./main.js"></script>

<style scoped>
.space-top {
  margin-top: 20px;
}
</style>
