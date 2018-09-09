const {
  curry,
  map
} = require('ramda')

async function findNBy (db, params, cursor) {
  const selector = {}

  if (params._id !== '_') {
    selector.$or = [
      { target: params._id },
      { source: params._id }
    ]
  }

  const { limit, skip } = map(Number, cursor)

  return db
    .find({
      selector,
      limit,
      skip
    })
    .then(res => res.docs)
}

function install () {
  return async ctx => {
    const { db, params, query } = ctx

    const collection = db.repos_transactions

    ctx.body = await findNBy(collection, params, query)
  }
}

module.exports = install
