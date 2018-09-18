<template lang="pug">
el-form(
  label-position="right"
  label-width="80px")

  el-row(:gutter="20")

    el-col(:span="12")
      el-form-item(label="Total")
        el-input(type="number"
          v-model.number="form.total")

    el-col(:span="24")
      el-form-item(label="Note")
        el-input(type="textarea"
          v-model.number="form.note")

  el-form-item
    el-button(@click="submitForm")
      | Submit
</template>

<script>

import {
  clone
} from 'ramda'

import {
  stubObj,
  stubArray
} from 'ramda-adjunct'

const props = {
  product: {
    type: Object,
    default: stubObj
  },
  agents: {
    type: Array,
    default: stubArray
  }
}

const data = () => {
  return {
    form: {}
  }
}

const methods = {
  submitForm () {
    const form = clone(this.form)

    if (form.total > 0) {
      this.$emit('submit', form)
    }

    this.form.total = null
    this.form.note = null
  }
}

export default {
  name: 'tx-form',
  props,
  data,
  methods
}
</script>

<style>

</style>
