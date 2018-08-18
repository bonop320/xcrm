<template lang="pug">
div
  el-upload.image-uploader(
    action="/cdn/images"
    :on-success="handleUploadSuccess"
    )
    img.image(v-if="value"
      :src="imageUrl")
    span.el-icon-plus.image-uploader-icon(v-else)
</template>

<script>

const props = {
  value: String
}

const computed = {
  imageUrl () {
    return `/cdn/images/${this.value}`
  }
}

const methods = {
  handleUploadSuccess (res, file) {
    const { image } = res
    this.$emit('input', image)
  }
}

export default {
  name: 'product-form-image',
  props,
  computed,
  methods
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
