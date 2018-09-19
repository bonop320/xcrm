const composeM = require('koa-compose')

const {
  resolveTo,
  rejectTo,
  createIn
} = require('./helpers')

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

    return Promise
      .resolve(request.body)
      .then(createIn(db))
      .then(resolveTo(ctx))
      .catch(rejectTo(ctx))
  }

module.exports = () =>
  composeM([acl, createUser])
