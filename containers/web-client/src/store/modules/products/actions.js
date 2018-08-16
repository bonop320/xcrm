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

function createOne (ctx, body) {
  const commit = data => {
    ctx.commit('PUT_ONE', data)
    return data
  }

  return request
    .post('/', body)
    .then(res => res.data)
    .then(commit)
}

function updateOne (ctx, body) {
  const commit = data => {
    ctx.commit('PUT_ONE', data)
    return data
  }

  const uri = `/${body._id}`

  return request
    .put(uri, body)
    .then(res => res.data)
    .then(commit)
}

export {
  fetchAll,
  createOne,
  updateOne
}
