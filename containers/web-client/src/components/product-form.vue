<template lang="pug">
  el-form
    el-row
      el-col(:span="8")
        product-form-image(v-model="form.image")

      el-col(:span="16")
        el-form-item(label="Name")
          el-input(type="text"
            v-model="form.name")
        el-form-item(label="Price"
          v-if="action === 'create'")
          el-input(type="number"
            v-model.number="form.price")

    el-form-item
      el-button(@click="submitForm")
        | Submit
</template>

<script>
import { clone } from 'ramda'

import { stubObj } from 'ramda-adjunct'

import ProductFormImage from '@/components/product-form-image'

const props = {
  action: {
    type: String,
    default: 'create'
  },
  model: {
    type: Object,
    default: stubObj
  }
}

const data = () => {
  return {
    form: {}
  }
}

const methods = {
  submitForm () {
    const { form } = this
    this.$emit('submit', form)
  }
}

function mounted () {
  const { model } = this
  this.form = clone(model)
}

export default {
  name: 'product-form',
  components: {
    ProductFormImage
  },
  props,
  data,
  methods,
  mounted
}
</script>
