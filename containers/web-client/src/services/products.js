import request from './request'

function createOne (body) {
  return request
    .post('/products', body)
    .then(res => res.data)
}

function updateOne (body) {
  const uri = `/products/${body._id}`

  return request
    .put(uri, body)
    .then(res => res.data)
}

function fetchAll () {
  return request
    .get('/products')
    .then(res => res.data)
}

export {
  createOne,
  updateOne,
  fetchAll
}
