<template lang="pug">
el-card

  header(slot="header")
    span Submit Transaction

  el-form

    el-form-item(label="Amount")
      el-input(type="number"
        v-model.number="form.amount")

    template(v-if="role === 'admin'")
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

      el-form-item(label="Agent"
        v-if="form.action === 'transfer'")

        el-select(v-model="form.target")
          el-option(
            v-for="agent in agents"
            :key="agent._id"
            :label="agent.name"
            :value="agent._id")

    template(v-else)
      el-form-item(label="Action")
        el-select(v-model="form.action")
          el-option(
            label="Mark as sold"
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
  stubArray
} from 'ramda-adjunct'

const props = {
  role: {
    type: String,
    default: 'agent'
  },
  target: String,
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
  const { role, target } = this

  const action = role === 'admin'
    ? 'insert'
    : 'sell'

  this.form = {
    target,
    action,
    amount: 0
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


