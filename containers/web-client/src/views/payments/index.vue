<template lang="pug">
div
  el-dialog(
    width="500px"
    :visible.sync="displayPaymentDialog")

    payment-form(@submit="createPayment")

  el-card
    header.clearfix(slot="header")
      el-button.float-right(
        v-if="user.role === 'agent'"
        size="small"
        @click="openPaymentDialog")
        | Fill a payment

    payment-table(:members="payments")

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
