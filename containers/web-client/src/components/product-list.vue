<template lang="pug">
el-row(:gutter="20")
  el-col(v-for="product in products"
    :key="product._id"
    :span="8")

    product-list-item(
      :_id="product._id"
      :name="product.name"
      :price="product.price"
      @edit="emitEdit")
</template>

<script>
import ProductListItem from '@/components/product-list-item'

const props = {
  products: Array
}

const methods = {
  emitEdit (_id) {
    this.$emit('edit', _id)
  }
}

export default {
  name: 'product-list',
  props,
  components: {
    ProductListItem
  },
  methods
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
