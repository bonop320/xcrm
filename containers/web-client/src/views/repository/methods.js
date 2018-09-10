import { mapActions } from 'vuex'

const {
  fetchRepo,
  fetchTransactions
} = mapActions('repository', [
  'fetchRepo',
  'fetchTransactions'
])

function handleTransaction (tx) {
  console.log(tx)
}

// function submitCreate (data) {
//   const onSuccess = data => {
//     this.isCreating = false
//
//     this.$message({
//       message: `Product ${data.name} created`,
//       type: 'success'
//     })
//   }
//
//   this
//     .createOne(data)
//     .then(onSuccess)
// }

export {
  fetchRepo,
  fetchTransactions,
  handleTransaction
  // submitCreate,
}
