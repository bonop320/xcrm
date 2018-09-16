const Router = require('koa-router')

const { ulid } = require('ulid')

const createTx = require('./create-tx')
const findTxs = require('./find-txs')

function main () {
  const router = new Router()

  router
    .get('/', findTxs())
    .post('/', createTx())

  return router.routes()
}

module.exports = main
