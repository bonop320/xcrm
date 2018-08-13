<template lang="pug">
el-card.box-card
  div.clearfix(slot="header")
    span {{ name }}
  div
    | Description
</template>

<script>
const props = {
  name: String
}

export default {
  name: 'product-list-item',
  props
}
</script>


