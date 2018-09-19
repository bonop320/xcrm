<template lang="pug">
  el-form(
    ref="form"
    :model="form"
    label-position="left"
    label-width="80px")

    el-form-item(label="User ID")
      el-input(
        type="text"
        v-model="form._id")

    el-form-item(label="Phone")
      el-input(
        type="text"
        v-model="form.phone")

    el-form-item(label="Name")
      el-input(type="text"
        v-model="form.name")

    el-form-item(label="Password")
      el-input(type="password"
        v-model.number="form.password")

    el-form-item
      el-button(@click="submitForm")
        | Submit
</template>

<script>
import { always } from 'ramda'

const data = always({
  form: {}
})

const methods = {
  submitForm () {
    const { form } = this
    this.$emit('submit', form)
  }
}

export default {
  name: 'user-form',
  data,
  methods
}
</script>
