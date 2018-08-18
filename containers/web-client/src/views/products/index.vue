<template lang="pug">
div
  h1 Products

  div.control-toolbar.clearfix
    el-button(type="primary"
      @click="showCreateModal")
      | Create

  el-dialog(
    v-if="isCreating"
    :visible.sync="isCreating"
    @closed="closedCreateModal")
      product-form(
        action="create"
        @submit="submitCreate")

  el-dialog(
    v-if="isUpdating"
    :visible.sync="isUpdating"
    @closed="closedUpdateModal")
      product-form(
        action="update"
        :model="activeProduct"
        @submit="submitUpdate")

  product-list(
    :products="products"
    @edit="showUpdateModal")

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
