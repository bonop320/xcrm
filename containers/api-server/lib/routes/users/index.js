const Router = require('koa-router')

const { ulid } = require('ulid')

const getenv = require('getenv')

const {
  compose,
  evolve,
  pick,
  trim
} = require('ramda')

const pouchdb = require('../../middlewares/pouchdb')

const Model = require('./methods')

//

const SCOPE = 'users'

//

const routerFor = name => {
  const options = {
    prefix: `/${name}`
  }

  const router = new Router(options)

  router.use(pouchdb({ name }))

  return router
}

// Helpers


function create () {

  return async ctx => {
    const { request, db } = ctx

    ctx.body = await Model
      .create(db, request.body)
      .then(console.log)

    ctx.status = 201
  }
}

function install () {
  const router = routerFor(SCOPE)

  router
    .post('/', create())

  return router.routes()
}

module.exports = install
