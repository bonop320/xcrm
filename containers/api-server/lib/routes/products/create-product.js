const { ulid } = require('ulid')

const {
  compose,
  evolve,
  pick,
  prop,
  assoc,
  trim
} = require('ramda')

const FIELDS = [
  '_id',
  'name',
  'price',
  'image'
]

const productFrom = compose(
  evolve({
    name  : trim,
    price : Number
  }),
  pick(FIELDS)
)

const createIn = collection => data => {
  const withId = x =>
    assoc('_id', ulid(), x)

  return Promise
    .resolve(data)
    .then(assoc('_id', ulid()))
    .then(data => collection.put(data))
    .then(res => collection.get(res.id))
}

function main () {
  return async ctx => {
    const { request, db } = ctx

    ctx.body = await Promise
      .resolve(request.body)
      .then(productFrom)
      .then(createIn(db.products))

    ctx.status = 200
  }
}


module.exports = main
