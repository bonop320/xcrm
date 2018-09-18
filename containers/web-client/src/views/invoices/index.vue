<template lang="pug">
el-card
  header(slot="header")
    | Invoices

  invoice-table(:members="invoices")
</template>

<script src="./main.js"></script>
