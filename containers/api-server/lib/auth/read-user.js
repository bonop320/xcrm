const composeM = require('koa-compose')

const {
  resolveTo,
  rejectTo,
  readIn
} = require('./helpers')

function acl (ctx, next) {
  const { user } = ctx.state
  const { _id } = ctx.params

  if (user._id !== _id && user.role !== 'admin') {
    ctx.throw(403)
  }

  return next()
}

function readUser (ctx) {
  const { db, params } = ctx

  return readIn(db, params)
    .then(resolveTo(ctx))
    .catch(rejectTo(ctx))
}

module.exports = () =>
  composeM([acl, readUser])

