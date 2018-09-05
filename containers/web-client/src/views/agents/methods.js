import { mapActions } from 'vuex'

const { fetchAll, createOne } = mapActions('users', [
  'fetchAll',
  'createOne'
])

function showCreateModal () {
  this.isCreating = true
}

function submitCreate (data) {
  const onSuccess = data => {
    this.isCreating = false

    this.$message({
      message: `User ${data.name} created`,
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
  fetchAll,
  createOne
}
