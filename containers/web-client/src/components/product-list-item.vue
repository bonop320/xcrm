<template lang="pug">
el-card.box-card(:body-style="{ padding: '0px' }")
  div.image-holder
    img.image(:src="imageUrl")

  el-row.card-body
    el-col.card-content(:span="16")
      h3.name-tag {{ name }}
    el-col.card-control(:span="8")
      span.price-tag {{ price }}

</template>

<script>
const props = {
  _id: String,
  name: String,
  price: Number,
  image: String
}

const computed = {
  imageUrl () {
    const { image = 'none.jpg' } = this
    return `/cdn/images/${image}`
  }
}

export default {
  name: 'product-list-item',
  props,
  computed
}
</script>

<style scoped>
.image {
  width: 100%;
}

.card-body {
  padding: 15px;
}

.card-control {
  text-align: right;
}

.name-tag {
  margin: 5px 0;
  font-weight: normal;
}

</style>
