const Router = require('koa-router')

const create = require('./create')
const read = require('./read')
const find = require('./find')

// Helpers
function install () {
  const router = new Router()

  router
    .post('/', create())
    .get('/', find())
    .get('/:id', read())

  return router.routes()
}

module.exports = install
