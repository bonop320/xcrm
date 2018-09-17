<template lang="pug">
el-form(
  label-position="right"
  label-width="80px")

  el-row(:gutter="20")

    el-col(:span="12")
      el-form-item(label="Amount")
        el-input(type="number"
          v-model.number="form.amount")

    el-col(:span="12")
      el-form-item(label="Price")
        el-input(type="number"
          v-model.number="form.price")

  el-row(:gutter="20")
    template(v-if="role === 'admin'")
      el-col(:span="12")
        el-form-item(label="Action")
          el-select(v-model="form.action")
            el-option(
              label="Insert"
              value="insert")
            el-option(
              label="Remove"
              value="remove")
            el-option(
              label="Transfer"
              value="transfer")
      el-col(:span="12")
        el-form-item(label="Agent"
          v-if="form.action === 'transfer'")

          el-select(v-model="form.target")
            el-option(
              v-for="agent in agents"
              :key="agent._id"
              :label="agent.name"
              :value="agent._id")

    template(v-else)
      el-col(:span="12")
        el-form-item(label="Action")
          el-select(v-model="form.action")
            el-option(
              label="Sell"
              value="sell")

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
  role: {
    type: String,
    default: 'agent'
  },
  target: String,
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

    if (form.amount > 0) {
      this.$emit('submit', form)
    }

    this.form.amount = 0
    this.form.target = null
  }
}

function mounted () {
  const { role, target, product } = this

  const action = role === 'admin'
    ? 'insert'
    : 'sell'

  this.form = {
    target,
    action,
    amount: 0,
    price: product.price,
    subject: product._id
  }
}

export default {
  name: 'tx-form',
  props,
  data,
  methods,
  mounted
}
</script>

<style>

</style>
