const composeM = require('koa-compose')

const { findIn } = require('./helpers')

function acl (ctx, next) {
  const { user } = ctx.state

  if (user.role !== 'admin') ctx.throw(403)

  return next()
}

function findUsers (ctx, next) {
  const { db, request } = ctx

  const resolve = res => {
    ctx.body = res
    ctx.status = 200
  }

  return Promise
    .resolve(request.query)
    .then(findIn(db.users))
    .then(resolve)
}

module.exports = () =>
  composeM([acl, findUsers])
