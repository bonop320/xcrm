import request from './request'

function fetchMe () {
  return request
    .get('/me')
    .then(res => res.data)
}

export {
  fetchMe
}
