const { findIn } = require('./helpers')

function main () {
  return async ctx => {
    const { db, query } = ctx

    const resolve = data => {
      ctx.status = 200
      ctx.body = data
    }

    await Promise
      .resolve(query)
      .then(findIn(db))
      .then(resolve)
  }
}

module.exports = main
