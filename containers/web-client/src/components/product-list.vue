<template lang="pug">
el-row(:gutter="20")
  el-col(v-for="product in products"
    :key="product._id"
    :span="8")

    product-card(:params="product")
</template>

<script>
import ProductCard from '@/components/product-card'

const props = {
  products: Array
}

export default {
  name: 'product-list',
  props,
  components: {
    ProductCard
  }
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>
