<template lang="pug">
div
  h1 Products

  ul(v-if="products")
    li(v-for="product of products")
      router-link(to="#")
        | {{ product.name }}
</template>

<script src="./main.js"></script>

<style>
div {
  display: block;
}
</style>
