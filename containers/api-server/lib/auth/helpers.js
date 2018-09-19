// const { createHmac } = require('crypto')

const createError = require('http-errors')

const {
  unless,
  merge,
  replace,
  trim,
  curry,
  omit,
  map,
  prop,
  compose,
  evolve,
  propEq
} = require('ramda')

const md5 = require('md5')

// const hashFrom = (secret, input) =>
//   createHmac('sha256', secret)
//     .update(input)
//     .digest('hex')

// module.exports.hashFrom = curry(hashFrom)

const convert = evolve({
  _id      : trim,
  password : md5
})

const obscure = omit([
  'password',
  '_ref'
])

const hasPassword = password =>
  propEq('password', password)

const throwError = (code = 400) => {
  const err = createError(code)
  return Promise.reject(err)
}

const throw403 = _ =>
  throwError(403)

// ctx methods

const resolveTo = curry(
  function (ctx, body) {
    ctx.body = body
  }
)

const rejectTo = curry(
  function (ctx, err) {
    const code = err.code || err.status
    ctx.throw(createError(code))
  }
)

// db methods

const getIn = curry(
  function (db, id) {
    const _id = id._id || id.id || id

    return db
      .get(_id)
      .catch()
  }
)

const readIn = curry(
  function (db, id) {
    return getIn(db, id)
      .then(obscure)
  }
)

const putIn = curry(
  function (db, doc) {
    return db
      .put(doc)
      .then(readIn(db))
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
    const enhance = merge({
      role: 'agent',
      time: new Date()
    })

    return Promise
      .resolve(body)
      .then(convert)
      .then(enhance)
      .then(putIn(db))
  }
)

const readSignedIn = curry(
  function (db, body) {
    const { _id, password } = convert(body)

    const verify = unless(
      propEq('password', password),
      throw403
    )

    return getIn(db, _id)
      .then(verify)
      .then(obscure)
  }
)

// expose curried

module.exports = {
  resolveTo,
  rejectTo,
  getIn,
  putIn,
  findIn,
  readIn,
  readSignedIn,
  createIn
}
