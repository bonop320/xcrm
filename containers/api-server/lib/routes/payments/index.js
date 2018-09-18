const Router = require('koa-router')

const createPayment = require('./create-payment')
const findProducts = require('./find-payments')

function main () {
  const router = new Router()

  router
    .get('/', findProducts())
    .post('/', createPayment())

  return router.routes()
}

module.exports = main
