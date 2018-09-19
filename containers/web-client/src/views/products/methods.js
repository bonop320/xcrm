import { mapActions } from 'vuex'

const actions = mapActions({
  fetchAll: 'fetchProducts',
  createOne: 'createProduct'
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
  ...actions,
  submitCreate
}
