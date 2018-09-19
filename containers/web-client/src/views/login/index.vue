<template lang="pug">
el-card.center

  header(slot="header")
    strong Login

  el-form(:model="form")

    el-form-item(label="Id")
      el-input(v-model="form._id")

    el-form-item(label="Password")
      el-input(type="password"
        v-model="form.password")

    el-form-item
      el-button(
        type="submit"
        @click="onSubmit")
        | Submit

</template>

<script src="./main.js"></script>

<style scoped>
.center {
  margin: 60px auto;
}
</style>
