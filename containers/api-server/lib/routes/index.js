const Router = require('koa-router')

const products = require('./products')
const users = require('./users')
const me = require('./me')
const tokens = require('./tokens')
const repos = require('./repos')

const install = () => {
  const router = new Router()

  router.use('/products', products())
  router.use('/users', users())
  router.use('/tokens', tokens())
  router.use('/me', me())
  router.use('/repos', repos())

  return router.routes()
}

module.exports = install
