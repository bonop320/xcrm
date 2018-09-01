<template lang="pug">
div
  h1 Login

  el-form(
    :model="form"
    @submit.native.prevent="submitLogin")
    el-form-item(label="Phone")
      el-input(v-model="form.phone")
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
