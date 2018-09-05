<template lang="pug">
div
  h1 Users

  div.control-toolbar.clearfix
    el-button(type="primary"
      @click="showCreateModal")
      | Create

  el-dialog(
    v-if="isCreating"
    :visible.sync="isCreating")
      user-form(
        action="create"
        @submit="submitCreate")

  user-list(:members="users")

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
