const { removeIn } = require('./helpers')

function main () {
  return async ctx => {
    const { params, db } = ctx

    await Promise
      .resolve(params)
      .then(removeFrom(db))

    ctx.status = 204
  }
}

module.exports = main
