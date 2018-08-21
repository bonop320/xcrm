const Router = require('koa-router')

const products = require('./products')
const users = require('./users')

const install = () => {
  const router = new Router()

  router.use('/products', products())
  router.use('/users', users())

  return router.routes()
}

module.exports = install
