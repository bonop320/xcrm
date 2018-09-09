const Router = require('koa-router')

const readRepo = require('./read-repo')
const createTransaction = require('./create-transaction')
const listTransactions = require('./list-transactions')

function install () {
  const router = new Router()

  router
    .get('/:_id', readRepo())
    .post('/_/transactions', createTransaction())
    .get('/:_id/transactions', listTransactions())

  return router.routes()
}

module.exports = install
