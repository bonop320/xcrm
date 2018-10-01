const { ulid } = require('ulid')

const {
  curry,
  compose,
  pick,
  assoc
} = require('ramda')

const FIELDS = [
  '_id',
  'time',
  'issuer',
  'meta',
  'entries'
]

const compact = pick(FIELDS)

const stamp = x =>
  assoc('_id', ulid(), x)

const timestamp = x =>
  assoc('time', new Date(), x)

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
      .then(compact)
  }
)

const putIn = curry(
  function (db, body) {
    return db
      .put(compact(body))
      .then(readIn(db))
  }
)

const createIn = curry(
  function (db, body) {
    return Promise
      .resolve(body)
      .then(stamp)
      .then(timestamp)
      .then(compact)
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
    return db
      .find({ selector })
      .then(res => res.docs)
      .then(map(compact))
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
