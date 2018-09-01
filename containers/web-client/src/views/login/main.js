import { mapActions } from 'vuex'

const data = () => ({
  form: {
    phone: '',
    password: ''
  }
})

const methods = {
  onSubmit () {
    this
      .submitLogin(this.form)
  },
  ...mapActions([ 'submitLogin' ])
}

function mounted () {

}

export default {
  name: 'ViewLogin',
  data,
  methods,
  mounted
}
