<template lang="pug">
div
  h1 Products

  div.control-toolbar.clearfix
    el-button(type="primary"
      @click="showCreateModal")
      | Create

  el-dialog(
    :visible.sync="isUpdating"
    @closed="closedUpdateModal")
    el-form
      el-row
        el-col(:span="8")
          product-form-image(v-model="activeProduct")
        el-col(:span="16")
          product-form-fields(v-model="activeProduct")
      el-form-item
        el-button(@click="submitUpdate")
          | Submit

  el-dialog(
    :visible.sync="isCreating"
    @closed="closedCreateModal")
    el-form
      el-row
        el-col(:span="8")
          product-form-image(v-model="activeProduct")
        el-col(:span="16")
          product-form-fields(v-model="activeProduct")
      el-form-item
        el-button(@click="submitCreate")
          | Submit

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
