const { ulid } = require('ulid')

const {
  map,
  curry,
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

const convert = compose(
  evolve({
    name: trim,
    price: Number
  }),
  pick(FIELDS)
)

// db methods

const getIn = curry(
  function (db, id) {
    const _id = id._id || id.id || id
    return db.get(_id)
  }
)

const readIn = curry(
  function (db, id) {
    return getIn(db, id)
      .then(convert)
  }
)

const putIn = curry(
  function (db, body) {
    return db
      .put(convert(body))
      .then(readIn(db))
  }
)

const createIn = curry(
  function (db, body) {
    const stamp = x =>
      assoc('_id', ulid(), x)

    return Promise
      .resolve(body)
      .then(stamp)
      .then(convert)
      .then(putIn(db))
  }
)

const removeIn = curry(
  async function (db, id) {
    return getIn(db, id)
      .then(doc => db.remove(doc))
  }
)

const findIn = curry(
  async function (db, selector) {
    console.log(selector)

    return db
      .find({ selector })
      .then(res => res.docs)
      .then(map(convert))
  }
)

module.exports = {
  getIn,
  putIn,
  readIn,
  createIn,
  removeIn,
  findIn
}
