const { removeIn } = require('./helpers')

function main () {
  return async ctx => {
    const { params, db } = ctx

    await Promise
      .resolve(params._id)
      .then(removeFrom(db.products))

    ctx.status = 204
  }
}

module.exports = main
