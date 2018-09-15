const Router = require('koa-router')

const createProduct = require('./create-product')
const readProduct = require('./read-product')
const findProducts = require('./find-products')
const destroyProduct = require('./destroy-product')

function main () {
  const router = new Router()

  router
    .get('/', findProducts())
    .post('/', createProduct())
    .get('/:_id', readProduct())
    .delete('/:_id', destroyProduct())

  return router.routes()
}

module.exports = main
