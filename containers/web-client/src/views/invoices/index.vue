<template lang="pug">
el-card
  header(slot="header")
    | Invoices

  invoice-table(:members="members")
</template>

<script src="./main.js"></script>
