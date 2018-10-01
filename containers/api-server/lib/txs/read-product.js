const { readIn } = require('./helpers')

function main () {
  return async ctx => {
    const { params, db } = ctx

    const resolve = data => {
      ctx.status = 200
      ctx.body = data
    }

    const reject = err => {
      ctx.status = err.status
      ctx.body = err
    }

    await Promise
      .resolve(params)
      .then(readIn(db))
      .then(resolve)
      .catch(reject)
  }
}

module.exports = main
