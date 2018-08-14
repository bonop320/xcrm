import { mapActions } from 'vuex'

const { fetchAll, createOne } = mapActions('products', [
  'fetchAll',
  'createOne'
])

function showCreateModal () {
  this.isCreating = true
}

function submitCreate () {
  const onSuccess = data => {
    this.isCreating = false

    this.$message({
      message: `Product ${data.name} created`,
      type: 'success'
    })
  }

  this
    .createOne(this.nextProduct)
    .then(onSuccess)
}

function closedCreateModal () {
  this.nextProduct = {}
}

export {
  showCreateModal,
  submitCreate,
  closedCreateModal,
  fetchAll,
  createOne
}
