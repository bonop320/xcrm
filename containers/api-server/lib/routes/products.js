const Router = require('koa-router')

const pouchdb = require('../middlewares/pouchdb')

const SCOPE = 'products'

const routerFor = name => {
  const router = new Router({ prefix: `/${name}` })

  router.use(pouchdb({ name }))

  return router
}

function create () {
  return ctx => {
    const { request, db } = ctx



    ctx.body = 'exo'
  }
}

function install () {
  const router = routerFor(SCOPE)

  router.get('/', create())

  return router.routes()
}

module.exports = install

