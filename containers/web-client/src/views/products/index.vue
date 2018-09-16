<template lang="pug">
div
  el-card.top-bar
    el-button(
      type="primary"
      size="small"
      @click="showCreateModal")
      | Create

  el-dialog(
    v-if="isCreating"
    :visible.sync="isCreating")

    product-form(
      action="create"
      @submit="submitCreate")

  product-list(:products="products")

</template>

<script src="./main.js"></script>

<style scoped>

.top-bar {
  margin-bottom: 20px;
  text-align: right;
}

</style>
