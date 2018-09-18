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
  'book',
  'total',
  'note',
  'image'
]

const paymentFrom = compose(
  evolve({
    note   : trim,
    amount : Number
  }),
  pick(FIELDS)
)

const createIn = collection => data => {
  const withId = x =>
    assoc('_id', ulid(), x)

  return Promise
    .resolve(data)
    .then(assoc('_id', ulid()))
    .then(assoc('time', new Date()))
    .then(data => collection.put(data))
    .then(res => collection.get(res.id))
}

function main () {
  return async ctx => {
    const { request, db, state } = ctx

    ctx.body = await Promise
      .resolve(request.body)
      .then(paymentFrom)
      .then(assoc('book', state.user._id))
      .then(createIn(db.payments))

    ctx.status = 200
  }
}


module.exports = main
