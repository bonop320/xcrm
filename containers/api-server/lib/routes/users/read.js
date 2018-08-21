const {
  dissoc
} = require('ramda')

// helpers

//

module.exports = () => {
  const safe = dissoc('hash')

  return function readUser (ctx) {
    const { db, params } = ctx

    const read = x =>
      db.get(x.id)

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
      .then(safe)
      .then(resolve)
      .catch(reject)
  }
}
