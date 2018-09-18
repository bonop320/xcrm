// const { createHmac } = require('crypto')

const {
  merge,
  replace,
  trim,
  curry,
  dissoc,
  map,
  prop,
  compose,
  evolve
} = require('ramda')

const md5 = require('md5')

// const hashFrom = (secret, input) =>
//   createHmac('sha256', secret)
//     .update(input)
//     .digest('hex')

// module.exports.hashFrom = curry(hashFrom)

const obscure = dissoc('password')

const digitsFrom = compose(
  replace(/[^\d]/g, ''),
  String
)

// methods

const getIn = curry(
  function (db, id) {
    const _id = id._id || id.id || id

    return db
      .get(_id)
      .then(obscure)
  }
)

const putIn = curry(
  function (db, doc) {
    return db
      .put(doc)
      .then(getIn(db))
  }
)

const findIn = curry(
  function (db, selector) {
    const docsFrom = compose(
      map(obscure),
      prop('docs')
    )

    return db
      .find({ selector })
      .then(docsFrom)
  }
)

const createIn = curry(
  function (db, body) {
    const convert = evolve({
      _id      : trim,
      name     : trim,
      phone    : digitsFrom,
      password : md5
    })

    const enhance = merge({
      role: 'agent',
      time: new Date()
    })

    const compiled = compose(enhance, convert)

    return Promise
      .resolve(compiled(body))
      .then(putIn(db))
  }
)

// expose curried

module.exports = {
  getIn,
  putIn,
  findIn,
  createIn
}
