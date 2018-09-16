import {
  tap
} from 'ramda'

import request from '@/services/request'

function fetchAll (ctx) {
  const commit = arr =>
    ctx.commit('SET_ALL', arr)

  return request
    .get('/invoices')
    .then(res => res.data)
    .then(tap(commit))
}

export {
  fetchAll
}
