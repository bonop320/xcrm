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

  product-list(:products="members")

</template>

<script src="./main.js"></script>

<style scoped>

.top-bar {
  margin-bottom: 20px;
  text-align: right;
}

</style>
