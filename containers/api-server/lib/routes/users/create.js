const composeM = require('koa-compose')

const {
  compose,
  trim,
  prop,
  applySpec,
  replace
} = require('ramda')

const {
  stubObj,
  stubNull
} = require('ramda-adjunct')

const md5 = require('md5')

// generic helpers

const trimmedProp = key =>
  compose(trim, prop(key))

const hashedProp = key =>
  compose(md5, prop(key))

const numberFrom = compose(
  Number,
  replace(/[^\d]/g, '')
)

// domain helpers

const phoneOf = compose(numberFrom, prop('phone'))
const hashOf = compose(md5, prop('password'))
const nameOf = trimmedProp('name')
const idOf = compose(String, phoneOf)

// format

const parse = applySpec({
  _id   : idOf,
  name  : nameOf,
  phone : phoneOf,
  hash  : hashOf,
  repo  : stubObj,
  head  : stubNull
})

function acl (ctx, next) {
  const { user } = ctx.state

  if (user.role === 'admin') return next()

  ctx.throw(403)
}

function createUser (ctx) {
    const { db, request } = ctx

    const insert = data => {
      const { users } = db

      return users
        .put(data)
        .then(res => users.get(res.id))
    }

    const resolve = res => {
      console.log(res)

      ctx.body = res
      ctx.status = 201
    }

    const reject = err => {
      console.error(err)

      ctx.throw(err.status)
    }

    return Promise
      .resolve(request.body)
      .then(parse)
      .then(insert)
      .then(resolve)
      .catch(reject)
  }

module.exports = () => {
  return composeM([acl, createUser])
}
