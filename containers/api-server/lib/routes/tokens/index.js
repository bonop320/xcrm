const Router = require('koa-router')

const create = require('./create')

// Helpers
function install () {
  const router = new Router()

  router
    .post('/', create())

  return router.routes()
}

module.exports = install
