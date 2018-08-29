const Router = require('koa-router')

const read = require('./read')

// Helpers
function install () {
  const router = new Router()

  router
    .get('/', read())

  return router.routes()
}

module.exports = install
