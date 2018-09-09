const Router = require('koa-router')

const readRepo = require('./read-repo')
const createTransaction = require('./create-transaction')

function install () {
  const router = new Router()

  router
    .get('/:_id', readRepo())
    .post('/_/transactions', createTransaction())

  return router.routes()
}

module.exports = install
