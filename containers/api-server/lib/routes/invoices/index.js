const Router = require('koa-router')

const findInvoices = require('./find-invoices')

function main () {
  const router = new Router()

  router
    .get('/', findInvoices())

  return router.routes()
}

module.exports = main
