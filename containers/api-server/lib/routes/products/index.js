const Router = require('koa-router')

const { ulid } = require('ulid')

const {
  compose,
  evolve,
  pick,
  prop,
  assoc,
  trim
} = require('ramda')

const createProduct = require('./create-product')
const readProduct = require('./read-product')
const findProducts = require('./find-products')
const createTransaction = require('./create-transaction')
const findTxs = require('./find-txs')

function destroy () {
  return async ctx => {
    const { params, db } = ctx

    const destroy = id => {
      const { products } = db

      return products
        .get(id)
        .then(doc => products.remove(doc))
    }

    await Promise
      .resolve(params._id)
      .then(destroy)

    ctx.status = 204
  }
}

function main () {
  const router = new Router()

  router
    .get('/', findProducts())
    .post('/', createProduct())
    .get('/:_id', readProduct())
    .delete('/:_id', destroy())
    .post('/:_id/txs', createTransaction())
    .get('/:_id/txs', findTxs())

  return router.routes()
}

module.exports = main
