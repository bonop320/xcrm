import { mapActions } from 'vuex'

const {
  fetchRepo,
  fetchTransactions,
  createTransaction
} = mapActions('repository', [
  'fetchRepo',
  'fetchTransactions',
  'createTransaction'
])

const {
  fetchAgents
} = mapActions('users', [
  'fetchAgents'
])

function openTxModalFor (product) {
  this.txModalVisible = true

  this.activeTxSubject = product._id
}

function closeTxModal () {
  this.txModalVisible = false

  this.activeTxSubject = null
}

function submitTxCreate (body) {
  this.closeTxModal()

  this
    .createTransaction(body)
    .then(console.log)
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
  fetchAgents,
  submitTxCreate,
  openTxModalFor,
  closeTxModal,
  createTransaction
}
