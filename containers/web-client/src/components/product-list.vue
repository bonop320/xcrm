<template lang="pug">
el-row(:gutter="20")
  el-col(v-for="product in products"
    :span="8")

    product-list-item(
      :name="product.name")
</template>

<script>
import ProductListItem from '@/components/product-list-item'

const props = {
  products: Array
}

export default {
  name: 'product-list',
  props,
  components: {
    ProductListItem
  }
}
</script>
