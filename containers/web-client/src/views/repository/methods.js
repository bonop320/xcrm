import { mapActions } from 'vuex'

const { fetchOne, createOne } = mapActions('repository', [
  'fetchOne',
  'createOne'
])

function showCreateModal () {
  this.isCreating = true
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

export {
  showCreateModal,
  submitCreate,
  fetchOne,
  createOne
}
