<template lang="pug">
div
  el-input(type="hidden"
    v-model="image")
  el-upload.image-uploader(
    action="/cdn/images"
    )
    img.image(v-if="image"
      :src="image")
    span.el-icon-plus.image-uploader-icon(v-else)
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
  image: handleInputFor('image')
}

export default {
  name: 'product-form-image',
  props,
  computed
}
</script>

<style scoped>
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .image {
    width: 200px;
    height: 200px;
    display: block;
  }
</style>
