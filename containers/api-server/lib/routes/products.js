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

const pouchdb = require('../middlewares/pouchdb')

//

const SCOPE = 'products'

const FIELDS = [
  '_id',
  'name',
  'price',
  'image'
]

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

const productFrom = compose(
  evolve({
    name  : trim,
    price : Number
  }),
  pick(FIELDS)
)

//

function create () {
  const stamp = obj =>
    assoc('_id', ulid(), obj)

  return async ctx => {
    const { request, db } = ctx

    const insert = data =>
      db.put(data)

    const recover = res =>
      db.get(res.id)

    ctx.body = await Promise
      .resolve(request.body)
      .then(productFrom)
      .then(stamp)
      .then(insert)
      .then(recover)
      .then(productFrom)

    ctx.status = 200
  }
}

function read () {
  return async ctx => {
    const { params, db } = ctx

    const get = id =>
      db.get(id)

    const resolve = data => {
      ctx.status = 200
      ctx.body = data
    }

    const reject = err => {
      ctx.status = err.status
      ctx.body = err
    }

    await Promise
      .resolve(params._id)
      .then(get)
      .then(productFrom)
      .then(resolve)
      .catch(reject)
  }
}

function destroy () {
  return async ctx => {
    const { params, db } = ctx

    const get = id =>
      db.get(id)

    const del = doc =>
      db.remove(doc)

    await Promise
      .resolve(params._id)
      .then(get)
      .then(del)

    ctx.status = 204
  }
}

function find () {
  return async ctx => {
    const { request, db } = ctx

    const find = (selector = {}) =>
      db.find({ selector })
        .then(prop('docs'))

    const resolve = data => {
      ctx.status = 200
      ctx.body = data
    }

    await Promise
      .resolve(request.query)
      .then(find)
      .then(resolve)
  }
}

function install () {
  const router = routerFor(SCOPE)

  router
    .get('/', find())
    .post('/', create())
    .get('/:_id', read())
    .delete('/:_id', destroy())

  return router.routes()
}

module.exports = install
