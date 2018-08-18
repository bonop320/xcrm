<template lang="pug">
el-card.box-card(:body-style="{ padding: '0px' }")
  div.image-holder
    img.image(:src="imageUrl")

  el-row.card-body
    el-col.card-content(:span="18")
      h3.name-tag {{ name }}
      span.price-tag {{ price }}
    el-col.card-control(:span="6")
      el-button(
        icon="el-icon-edit"
        circle
        @click="emitEdit")

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

const methods = {
  emitEdit () {
    this.$emit('edit', this._id)
  }
}

export default {
  name: 'product-list-item',
  props,
  methods,
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
