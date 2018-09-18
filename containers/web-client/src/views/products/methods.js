import { mapActions } from 'vuex'

const actions = mapActions({
  fetchAll  : 'products/fetchAll',
  createOne : 'products/createOne'
})

function submitCreate (data) {
  const onSuccess = data => {
    this.$message({
      message: `Product ${data.name} created`,
      type: 'success'
    })

    this.openModal = null
  }

  this
    .createOne(data)
    .then(onSuccess)
}

export default {
  submitCreate,
  ...actions
}
