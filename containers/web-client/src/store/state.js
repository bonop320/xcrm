const jwtDecode = require('jwt-decode')

const token = window.localStorage.getItem('token')
const user = token && jwtDecode(token)

export default {
  user,
  token,
  agents: [],
  products: []
}
