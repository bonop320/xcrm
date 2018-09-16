<template lang="pug">
el-card(:body-style="{ padding: '0px' }")
  div.image-holder
    img.image(:src="imageUrl")

  header(slot="header")
    router-link(
      :to="{ name: 'view-products-one', params: params }")
      | {{ params.name }}

  el-row.card-body
    el-col(:span="12")
      dl
        dt Price
        dd {{ params.price }}

    el-col(:span="12")
      dl.align-right
        dt Amount
        dd {{ params.amount }}

</template>

<script>
const props = {
  params: Object
}

const computed = {
  imageUrl () {
    const { image = 'none.jpg' } = this.params
    return `/cdn/images/${image}`
  }
}

export default {
  name: 'product-card',
  props,
  computed
}
</script>

<style scoped>
.image {
  width: 100%;
}

.card-body {
  padding: 0 15px;
}

.card-control {
  text-align: right;
}

dl {
  text-align: center;
}

dt {
  color: #666;
}

dd {
  margin: 0;
  font-size: 1.1em;
  line-height: 1.8em;
  font-weight: bold;
}
</style>
