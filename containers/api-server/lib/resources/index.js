const Router = require('koa-router')

const createProduct = require('./create-product')
const readProduct = require('./read-product')
const findProducts = require('./find-products')
const destroyProduct = require('./destroy-product')

const PouchDB = require('../pouchdb')

const assocM = (key, value) => {
  return (ctx, next) => {
    ctx[key] = value
    return next()
  }
}

function main () {
  const router = new Router()
  const db = new PouchDB('products')

  router
    .use(assocM('db', db))

  router
    .get('/products', findProducts())
    .post('/products', createProduct())
    .get('/products/:_id', readProduct())
    .delete('/products/:_id', destroyProduct())

  return router.routes()
}

module.exports = main
