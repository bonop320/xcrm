<template lang="pug">
  el-form(
    ref="form"
    :model="form"
    label-position="left"
    label-width="80px")

    el-row(:gutter="20")

      el-col(:span="14")
        el-form-item(label="Name")
          el-input(type="text"
            v-model="form.name")

        el-form-item(label="Price")
          el-input(type="number"
            v-model.number="form.price")

        el-form-item
          el-upload(
            action="/cdn/images"
            :show-file-list="false"
            :on-success="handleUploadSuccess")

            el-button Upload image

      el-col.preview-image(:span="10")
        img.image(:src="imageUrl")

      el-col(:span="24")
        el-form-item
          el-button(
            type="primary"
            @click="emitSubmit")
            | Submit

</template>

<script>
import { always, pick } from 'ramda'

const FIELDS = [
  'name',
  'price',
  'image'
]

const props = {
  name: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String
  }
}

const data = always({
  form: {}
})

const computed = {
  imageUrl () {
    const { image = 'none.jpg' } = this.form
    return `/cdn/images/${image}`
  }
}

const methods = {
  handleUploadSuccess (res, file) {
    this.form.image = res.image
  },
  reset () {
    this.form = pick(FIELDS, this)
  },
  emitSubmit () {
    this.$emit('submit', this.form)

    this.reset()
  }
}

function mounted () {
  this.reset()
}

export default {
  name: 'product-manage-form',
  props,
  data,
  computed,
  methods,
  mounted
}
</script>

<style>
  .preview-image .image {
    width: 100%;
    display: block;
  }
</style>
