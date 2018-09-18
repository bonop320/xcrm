<template lang="pug">
div
  el-card.top-bar
    el-button(
      type="primary"
      size="small"
      @click="openModal = 'create'")
      | Create

  el-dialog(
    title="Create product"
    v-if="openModal === 'create'"
    @close="openModal = null"
    width="600px"
    :visible="true")

    product-manage-form(
      @submit="submitCreate")

  el-row(:gutter="20")
    el-col(v-for="member in members"
      :key="member._id"
      :span="8")

      product-card(
        :_id="member._id"
        :name="member.name"
        :price="member.price"
        :image="member.image"
        :amount="totalAmountOf(member._id)")

</template>

<script src="./main.js"></script>

<style scoped>

.top-bar {
  margin-bottom: 20px;
  text-align: right;
}

</style>
