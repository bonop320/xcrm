const Router = require('koa-router')

const createUser = require('./create')
const readUser = require('./read')
const findUsers = require('./find')

// Helpers
function install () {
  const router = new Router()

  router
    .post('/', createUser())
    .get('/', findUsers())
    .get('/:_id', readUser())

  return router.routes()
}

module.exports = install
