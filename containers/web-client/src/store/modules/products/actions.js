import Axios from 'axios'

const request = Axios.create({
  baseURL: '/api/products'
})

function fetchAll (ctx) {
  const commit = arr => {
    ctx.commit('SET_ALL', arr)
    return arr
  }

  return request
    .get('/')
    .then(res => res.data)
    .then(commit)
}

export {
  fetchAll
}
