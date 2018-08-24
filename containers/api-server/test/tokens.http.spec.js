import test from 'ava'

import Axios from 'axios'
import PouchDB from 'pouchdb'

import md5 from 'md5'

//

const USER = {
  role: 'agent',
  phone: 37455364636,
  password: 'passw0rd'
}

//

const request = Axios.create({
  baseURL: 'http://localhost:8080/tokens'
})

const db = new PouchDB('http://localhost:5984/users')

const repo = []

//

test.before(async  _ => {

  const id = String(USER.phone)

  await db
    .get(id)
    .then(doc => db.remove(doc))
    .catch(_ => _)

  const body = {
    _id  : id,
    hash : md5(USER.password),
    role : USER.role
  }

  await db.put(body)
})

test.serial('create', async t => {
  const body = {
    phone: USER.phone,
    password: USER.password
  }

  const assertResult = x => {
    t.not(x.token, void 0)
    repo.push(x)
  }

  await request
    .post('/', body)
    .then(x => x.data)
    .then(assertResult)
})

test.serial('create (invalid)', async t => {
  const body = {
    phone: USER.phone,
    password: 'invalid'
  }

  const assertResult = x => {
    t.fail('should not pass')
  }

  const assertFailure = err => {
    t.is(err.response.status, 409)
  }

  await request
    .post('/', body)
    .then(x => x.data)
    .then(assertResult)
    .catch(assertFailure)
})
