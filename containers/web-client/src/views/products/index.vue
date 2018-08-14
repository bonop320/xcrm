<template lang="pug">
div
  h1 Products

  div.control-toolbar.clearfix
    el-button(type="primary"
      @click="showCreateModal")
      | Create

  el-dialog(
    :visible.sync="isCreating"
    @closed="closedCreateModal")
    el-form
      product-form-fields(v-model="nextProduct")
      el-form-item
        el-button(@click="submitCreate")
          | Submit

  product-list(:products="products")

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
