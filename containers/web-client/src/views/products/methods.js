import { mapActions } from 'vuex'

const { fetchAll, createOne } = mapActions('products', [
  'fetchAll',
  'createOne'
])

function showCreateModal () {
  this.isCreating = true
}

function showUpdateModal (_id) {
  const { products } = this.$store.state

  this.activeProduct = products[_id]

  this.isUpdating = true
}

function submitCreate (data) {
  const onSuccess = data => {
    this.isCreating = false

    this.$message({
      message: `Product ${data.name} created`,
      type: 'success'
    })
  }

  this
    .createOne(data)
    .then(onSuccess)
}

function submitUpdate (data) {
  console.log(data)
}

function closedUpdateModal () {
  this.activeProduct = {}
}

function closedCreateModal () {
  this.activeProduct = {}
}

export {
  showCreateModal,
  submitCreate,
  closedCreateModal,
  showUpdateModal,
  submitUpdate,
  closedUpdateModal,
  fetchAll,
  createOne
}
