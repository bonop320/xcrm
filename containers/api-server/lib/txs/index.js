const Router = require('koa-router')

const createTx = require('./create-tx')
// const readProduct = require('./read-product')
// const findProducts = require('./find-products')
// const destroyProduct = require('./destroy-product')

const PouchDB = require('../pouchdb')

const dbSetter = () => {
  const db = new PouchDB('txs')

  return (ctx, next) => {
    ctx.db = db
    return next()
  }
}

function main () {
  const router = new Router()

  router
    .use(dbSetter())

  router
    // .get('/txs', findProducts())
    .post('/txs', createTx())
    // .get('/txs/:_id', readProduct())
    // .delete('/txs/:_id', destroyProduct())

  return router.routes()
}

module.exports = main
