const composeM = require('koa-compose')

const { getIn } = require('./helpers')

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

  const resolve = res => {
    ctx.body = res
    ctx.status = 200
  }

  const reject = err => {
    ctx.throw(err.status)
  }

  return Promise
    .resolve(params)
    .then(getIn(db.users))
    .then(resolve)
    .catch(reject)
}

module.exports = () =>
  composeM([acl, readUser])

