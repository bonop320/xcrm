const Router = require('koa-router')

const readRepo = require('./read-repo')
const createTransaction = require('./create-transaction')
const listTransactions = require('./list-transactions')

function main () {
  const router = new Router()

  router
    .get('/:_id', readRepo())
    .post('/:_id/transactions', createTransaction())
    .get('/:_id/transactions', listTransactions())

  return router.routes()
}

module.exports = main
