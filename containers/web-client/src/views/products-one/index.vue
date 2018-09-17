<template lang="pug">
div(v-if="self")
  el-row(:gutter="20")
    el-col(:span="8")
      product-card(:params="self")

    el-col(:span="16")
      el-dialog(
        width="500px"
        :visible.sync="displayTxDialog")

        tx-form.space-top(
          :role="user.role"
          :product="self"
          :agents="agents"
          @submit="createTx")

      el-card
        header.clearfix(slot="header")
          el-button.float-right(
            size="small"
            @click="openTxDialog")
            | Create a transaction

        tx-table(:members="self.txs")

</template>

<script src="./main.js"></script>

<style scoped>
.space-top {
  margin-top: 20px;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

</style>
