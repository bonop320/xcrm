const getenv = require('getenv')

const Router = require('koa-router')

const composeM = require('koa-compose')

const couchdb = require('./koa-couchdb')

const verifyToken = require('./verify-token')
const createToken = require('./create-token')
const createUser = require('./create-user')
const readUser = require('./read-user')
const findUsers = require('./find-users')

// Settings

const JWT_OPTIONS = getenv.multi({
  secret: ['JWT_SECRET', 'changeit'],
  cookie: ['JWT_COOKIE', 'token']
})

const COUCHDB_OPTIONS = getenv.multi({
  host: ['COUCHDB_URL', 'http://localhost:5984']
})

// Helpers
function main () {
  const router = new Router()

  router
    .use(couchdb(COUCHDB_OPTIONS))

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
