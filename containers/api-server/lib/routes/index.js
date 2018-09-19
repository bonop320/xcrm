const Router = require('koa-router')

const txs = require('./txs')
const invoices = require('./invoices')
const payments = require('./payments')

const install = () => {
  const router = new Router()

  router.use('/txs', txs())
  router.use('/invoices', invoices())
  router.use('/payments', payments())

  return router.routes()
}

module.exports = install
