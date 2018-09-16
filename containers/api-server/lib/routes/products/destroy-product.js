const { curry } = require('ramda')

const removeFrom = curry(
  async function (db, id) {
    return db
      .get(id)
      .then(doc => db.remove(doc))
  }
)

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
