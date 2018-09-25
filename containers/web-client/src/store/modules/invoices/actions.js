import {
  tap
} from 'ramda'

import {
  findIn
} from '@/store/db'

function fetchAll (ctx) {
  const commit = arr =>
    ctx.commit('SET_ALL', arr)

  return findIn('receivables', {})
    .then(tap(commit))
}

export {
  fetchAll
}
