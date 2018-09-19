const composeM = require('koa-compose')

const {
  resolveTo,
  findIn
} = require('./helpers')

function acl (ctx, next) {
  const { user } = ctx.state

  if (user.role !== 'admin') ctx.throw(403)

  return next()
}

function findUsers (ctx, next) {
  const { db, request } = ctx

  return Promise
    .resolve(request.query)
    .then(findIn(db))
    .then(resolveTo(ctx))
}

module.exports = () =>
  composeM([acl, findUsers])
