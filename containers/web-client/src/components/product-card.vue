<template lang="pug">
el-card(:body-style="{ padding: '0px' }")
  div.image-holder
    img.image(:src="imageUrl")

  header(slot="header")
    router-link(
      :to="`/products/${_id}`")
      | {{ name }}

  el-row.card-body
    el-col(:span="12")
      dl
        dt Price
        dd {{ price }}

    el-col(:span="12")
      dl.align-right
        dt Amount
        dd {{ amount }}

</template>

<script>
const props = {
  _id: {
    type: String
  },
  amount: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String,
    default: 'none.jpg'
  }
}

const computed = {
  imageUrl () {
    const { image } = this
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
