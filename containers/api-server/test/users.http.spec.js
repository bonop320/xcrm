import test from 'ava'

import Axios from 'axios'

import {
  prop
} from 'ramda'

const request = Axios.create({
  baseURL: 'http://localhost:8080/users'
})

const repo = []

test.serial('create', async t => {
  const body = {
    name: ' Aram Baykalov',
    phone: '+37455364636 ',
    password: 'password'
  }

  const assertResult = x => {
    t.is(typeof x._id, 'string', 'generate id')
    t.is(x.name, 'Aram Baykalov', 'trim name')
    t.is(x.phone, '37455364636', 'trim phone')
    t.is(x.password, void 0, 'omit password')

    repo.push(x)
  }

  await request
    .post('/', body)
    .then(prop('data'))
    .then(assertResult)
})

// test.serial('read', async t => {
//   const [ body ] = repo
//
//   const assertResult = res => {
//     t.is(typeof res._id, 'string', 'generate id')
//     t.is(res.name, 'The Great Soviet Encyclopedia', 'trim name')
//     t.is(res.price, 100, 'price is number')
//   }
//
//   await request
//     .get(`/${body._id}`)
//     .then(prop('data'))
//     .then(assertResult)
// })
//
// test.serial('find', async t => {
//   const [ body ] = repo
//
//   const assertResult = res => {
//     t.true(Array.isArray(res))
//   }
//
//   await request
//     .get(`/`)
//     .then(prop('data'))
//     .then(assertResult)
// })
//
// test.serial('delete', async t => {
//   const [ body ] = repo
//
//   await request
//     .delete(`/${body._id}`)
//     .then(res => {
//       t.is(res.status, 204)
//     })
//
//   await request
//     .get(`/${body._id}`)
//     .then(_ => t.fail('should not exist anymore'))
//     .catch(res => {
//       t.is(res.response.status, 404)
//     })
// })
