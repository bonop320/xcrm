import Axios from 'axios'

import { assocPath } from 'ramda'
import { rejectP } from 'ramda-adjunct'

const request = Axios.create({ baseURL: '/api' })

request.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')
  const header = `Bearer ${token}`

  return assocPath(['headers', 'Authorization'], header, config)
}, rejectP)

export default request
