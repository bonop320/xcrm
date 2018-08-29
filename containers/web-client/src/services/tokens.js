import request from './request'

function create (body) {
  return request
    .post('/tokens', body)
    .then(res => res.data)
}

export {
  create
}
