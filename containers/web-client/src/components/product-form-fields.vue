<template lang="pug">
div
  el-form-item(
    label="Name"
    )
    el-input(type="text"
      v-model="name")
  el-form-item(
    label="Price"
    )
    el-input(type="number"
      v-model.number="price")
</template>

<script>
import { prop, assoc } from 'ramda'
import { stubObj } from 'ramda-adjunct'

/*
const FIELDS = [
  'name',
  'price',
  'description'
]
*/

const props = {
  value: {
    type: Object,
    default: stubObj
  }
}

const handleInputFor = key => {
  return {
    get () {
      return prop(key, this.value)
    },
    set (value) {
      const data = assoc(key, value, this.value)
      this.$emit('input', data)
    }
  }
}

const computed = {
  name: handleInputFor('name'),
  price: handleInputFor('price')
}

export default {
  name: 'product-form-fields',
  props,
  computed
}
</script>

<style scoped>
label {
  display: inline-block;
  padding: 5px 0;
}
</style>
