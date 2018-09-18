<template lang="pug">
el-form(
  ref="form"
  :model="form"
  label-position="left"
  label-width="80px")

  el-form-item(label="Amount")
    el-input(type="number"
      v-model.number="form.amount")

  el-form-item(label="Price")
    el-input(type="number"
      v-model.number="form.price")

  el-form-item(label="Agent")

    el-select(v-model="form.target")
      el-option(
        v-for="agent in agents"
        :key="agent._id"
        :label="agent.name"
        :value="agent._id")

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

import {
  stubArray
} from 'ramda-adjunct'

const FIELDS = [
  'action',
  'subject',
  'amount',
  'price',
  'target'
]

const props = {
  action: {
    type: String,
    default: 'transfer'
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
  },
  agents: {
    type: Array,
    default: stubArray
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
  name: 'product-allocate-form',
  props,
  data,
  methods,
  mounted
}
</script>
