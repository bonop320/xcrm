import { mapActions } from 'vuex'

const data = () => ({
  form: {}
})

const methods = {
  onSubmit () {
    this
      .submitLogin(this.form)
  },
  ...mapActions([ 'submitLogin' ])
}

export default {
  name: 'view-login',
  data,
  methods
}
