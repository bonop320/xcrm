<template lang="pug">
div
  el-upload.image-uploader(
    action="/cdn/images"
    :show-file-list="false"
    :on-success="handleUploadSuccess")

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

<style>
  .image-uploader .el-upload {
    border: 1px solid #ddd;
    border-radius: 1px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }

  .image {
    width: 180px;
    height: 180px;
    display: block;
  }
</style>
