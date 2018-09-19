import { mapActions } from 'vuex'

const actions = mapActions([
  'fetchAgents',
  'createAgent'
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
    .createAgent(data)
    .then(onSuccess)
}

export default {
  ...actions,
  showCreateModal,
  submitCreate
}
