<template lang="pug">
el-form(
  ref="form"
  :model="form"
  label-position="left"
  label-width="80px")

  el-form-item(label="Action")

    el-select(v-model="form.action")
      el-option(
        label="Insert"
        value="insert")
      el-option(
        label="Remove"
        value="remove")

  el-form-item(label="Amount")
    el-input(type="number"
      v-model.number="form.amount")

  el-form-item
    el-button(
      type="primary"
      @click="emitSubmit")
      | Submit

    el-button(
      @click="emitReset")
      | Reset
</template>

<script>
import {
  clone,
  pick,
  always
} from 'ramda'

const FIELDS = [
  'action',
  'subject',
  'amount',
  'price'
]

const props = {
  action: {
    type: String,
    default: 'insert'
  },
  subject: {
    type: String
  },
  amount: {
    type: Number
  },
  price: {
    type: Number
  },
  target: {
    type: String
  }
}

const data = always({
  form: {}
})

const methods = {
  reset () {
    this.form = pick(FIELDS, this)
  },
  emitSubmit () {
    const form = clone(this.form)

    const isValid = form.amount > 0

    if (isValid) {
      this.$emit('submit', form)
    }

    this.reset()
  },
  emitReset () {
    this.$emit('reset')
    this.reset()
  }
}

function mounted () {
  this.reset()
}

export default {
  name: 'product-account-form',
  props,
  data,
  methods,
  mounted
}
</script>
