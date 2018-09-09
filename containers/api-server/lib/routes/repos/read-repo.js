const { ulid } = require('ulid')

const {
  curry,
  assoc,
  merge
} = require('ramda')

const FIELDS = [
  '_id',
  'name',
  'price',
  'image'
]

const read = curry(
  async function (db, _id) {
    await db.putIfNotExists({ _id })
    return db.get(_id)
  }
)

//
function main () {
  return async ctx => {
    const { db, params } = ctx

    const res = await Promise
      .resolve(params._id)
      .then(read(db.repos))

    ctx.body = res
  }
}

module.exports = main
