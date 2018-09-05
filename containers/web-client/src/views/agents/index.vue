<template lang="pug">
div
  div.control-toolbar.clearfix
    el-button(type="primary"
      @click="showCreateModal")
      | Create

  el-dialog(
    v-if="isCreating"
    :visible.sync="isCreating")
      agent-form(
        action="create"
        @submit="submitCreate")

  agent-table(:members="agents")

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
