<template lang="pug">
div(v-if="self")
  el-row(:gutter="20")
    el-col(:span="8")
      product-card(
        :_id="_id"
        :name="self.name"
        :price="self.price"
        :image="self.image"
        :amount="amount")

    el-col(:span="16")
      el-dialog(
        v-if="openModal === 'account'"
        title="Update quantity"
        width="320px"
        @close="openModal = null"
        :visible="true")

        product-account-form(
          :subject="_id"
          :amount="1"
          :price="self.price"
          @submit="submitTx")

      el-dialog(
        v-if="openModal === 'allocate'"
        title="Transfer to agent"
        width="320px"
        @close="openModal = null"
        :visible="true")

        product-allocate-form(
          :subject="_id"
          :amount="1"
          :price="self.price"
          :agentOptions="agentOptions"
          @submit="submitTx"
          @reset="isOpenAllocateModal = false")

      el-card
        header(slot="header")
          el-button(
            size="small"
            @click="openModal = 'account'")
            | Update quantity

          el-button(
            size="small"
            @click="openModal = 'allocate'")
            | Transfer

        tx-table(:members="txs")
</template>

<script src="./main.js"></script>
