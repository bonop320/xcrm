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

    const insert = data => {
      const { products } = db

      return products
        .put(data)
        .then(res => products.get(res.id))
    }

    ctx.body = await Promise
      .resolve(request.body)
      .then(productFrom)
      .then(stamp)
      .then(insert)
      .then(productFrom)

    ctx.status = 200
  }
}

function read () {
  return async ctx => {
    const { params, db } = ctx

    const read = id => {
      const { products } = db

      return products
        .get(id)
        .then(productFrom)
    }

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
      .then(read)
      .then(resolve)
      .catch(reject)
  }
}

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

function find () {
  return async ctx => {
    const { request, db } = ctx

    const find = (selector = {}) => {
      const { products } = db

      return products
        .find({ selector })
        .then(prop('docs'))
    }

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
