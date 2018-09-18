const composeM = require('koa-compose')

const { createIn } = require('./helpers')

// middleware functions

function acl (ctx, next) {
  const { user } = ctx.state

  if (user.role !== 'admin') {
    ctx.throw(403)
  }

  return next()
}

function createUser (ctx, next) {
    const { db, request } = ctx

    const resolve = res => {
      ctx.body = res
      ctx.status = 201
    }

    const reject = err => {
      console.error(err)

      ctx.throw(err.status)

      return next()
    }

    return Promise
      .resolve(request.body)
      .then(createIn(db.users))
      .then(resolve)
      .catch(reject)
  }

module.exports = () =>
  composeM([acl, createUser])
