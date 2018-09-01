const composeM = require('koa-compose')

const {
  dissoc
} = require('ramda')

// helpers

const ensafe = dissoc('hash')

function readUser (ctx) {
  const { db, state } = ctx

  const read = id => {
    const { users } = db

    return users
      .get(id)
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
    .resolve(state.user._id)
    .then(read)
    .then(resolve)
    .catch(reject)
}

module.exports = () => {
  return readUser
}
