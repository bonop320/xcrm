const getenv = require('getenv')

const Router = require('koa-router')

const composeM = require('koa-compose')

const verifyToken = require('./verify-token')
const createToken = require('./create-token')
const createUser = require('./create-user')
const readUser = require('./read-user')
const findUsers = require('./find-users')

const PouchDB = require('../pouchdb')

const assocM = (key, value) => {
  return (ctx, next) => {
    ctx[key] = value
    return next()
  }
}

// Settings

const JWT_OPTIONS = getenv.multi({
  secret: ['JWT_SECRET', 'changeit'],
  cookie: ['JWT_COOKIE', 'token']
})

// Helpers
function main () {
  const router = new Router()
  const db = new PouchDB('users')

  router
    .use(assocM('db', db))

  router
    .post('/tokens', createToken(JWT_OPTIONS))

  router
    .post('/users', createUser())
    .get('/users', findUsers())
    .get('/users/:_id', readUser())

  return composeM([
    verifyToken(JWT_OPTIONS),
    router.routes()
  ])
}

module.exports = main
