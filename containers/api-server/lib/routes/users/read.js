const composeM = require('koa-compose')

const {
  dissoc
} = require('ramda')

// helpers

const ensafe = dissoc('hash')

//

function acl (ctx, next) {
  const { user } = ctx.state
  const { id } = ctx.params

  console.log(user._id, id)

  if (user._id === id || user.role === 'admin')
    return next()

  ctx.throw(403)
}

function readUser (ctx) {
  const { db, params } = ctx

  const read = x => {
    const { users } = db

    return users
      .get(x.id)
      .then(ensafe)
  }

  const resolve = res => {
    ctx.body = res
    ctx.status = 200
  }

  const reject = err => {
    ctx.throw(err.status)
  }

  return Promise
    .resolve(params)
    .then(read)
    .then(resolve)
    .catch(reject)
}

module.exports = () => {
  return composeM([acl, readUser])
}
