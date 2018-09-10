<template lang="pug">
  el-form
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

    el-form-item(label="Product")

      el-select(v-model="form.subject")
        el-option(
          v-for="subject in products"
          :key="subject._id"
          :label="subject.name"
          :value="subject._id")

    el-form-item(label="Amount")
      el-input(type="number"
        v-model.number="form.amount")

    el-form-item(label="Agent"
      v-if="form.action === 'transfer'")

      el-select(v-model="form.target")
        el-option(
          v-for="agent in agents"
          :key="agent._id"
          :label="agent.name"
          :value="agent._id")

    el-form-item
      el-button(@click="submitForm")
        | Submit
</template>

<script>
import {
  stubArray
} from 'ramda-adjunct'

const props = {
  action: {
    type: String,
    default: 'insert'
  },
  subject: String,
  target: String,
  products: {
    type: Array,
    default: stubArray
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
    this.$emit('submit', this.form)
  }
}

function mounted () {
  const { action, subject, target } = this

  this.form = {
    subject,
    target,
    amount: 0,
    action
  }
}

export default {
  name: 'product-tx-form',
  props,
  data,
  methods,
  mounted
}
</script>
