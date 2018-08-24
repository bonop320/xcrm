const composeM = require('koa-compose')

const {
  map,
  dissoc
} = require('ramda')

const ensafeAll = map(dissoc('hash'))

function acl (ctx, next) {
  const { user } = ctx.state

  if (user._id === 'admin') return next()

  ctx.throw(403)
}

function findUsers (ctx) {
  const { db, request } = ctx

  const resolve = res => {
    ctx.body = res
    ctx.status = 200
  }

  const find = selector => {
    const { users } = db

    return users
      .find({ selector })
      .then(res => res.docs)
      .then(ensafeAll)
  }

  return Promise
    .resolve(request.query)
    .then(find)
    .then(resolve)
}

module.exports = () => {
  return composeM([acl, findUsers])
}
