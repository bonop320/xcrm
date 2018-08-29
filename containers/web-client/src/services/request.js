import Axios from 'axios'

import { assocPath } from 'ramda'
import { rejectP } from 'ramda-adjunct'

Axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token')

  return assocPath(['headers', 'token'], token, config)
}, rejectP)

export default Axios.create({ baseURL: '/api' })
