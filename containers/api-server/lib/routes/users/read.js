const {
  dissoc
} = require('ramda')

// helpers

//

module.exports = () => {
  const ensafe = dissoc('hash')

  return function readUser (ctx) {
    const { db, params } = ctx

    console.log(db)

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
}
