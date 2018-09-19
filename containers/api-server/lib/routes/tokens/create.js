const jwt = require('jsonwebtoken')

const md5 = require('md5')

const getenv = require('getenv')

const {
  compose,
  prop,
  applySpec,
  replace,
  pick
} = require('ramda')

// Settings

const JWT_SECRET = getenv('JWT_SECRET', 'changeit')

const RELEVANT_FIELDS = ['_id', 'role']

// generic helpers

const digitsFrom = compose(
  replace(/[^\d]/g, ''),
  String
)

const sign = x =>
  jwt.sign(x, JWT_SECRET)

// domain helpers

const phoneOf = compose(digitsFrom, prop('phone'))
const hashOf = compose(md5, prop('password'))
const idOf = compose(String, phoneOf)

// format

const parse = evolve({
  _id      : trim,
  password : md5
})

module.exports = () => {

  return function createUser (ctx) {
    const { db, request } = ctx

    console.log(request.body)

    const readUser = creds => {
      const { users } = db

      return users
        .get(creds._id)
        .then(user => {
          return user.hash === creds.hash
            ? user
            : Promise.reject({ status: 409 })
        })
        .then(pick(RELEVANT_FIELDS))
    }

    const resolve = res => {
      console.log(res)

      ctx.body = res
      ctx.status = 201
    }

    const reject = err => {
      console.error(err)

      ctx.throw(err.status)
    }

    return Promise
      .resolve(request.body)
      .then(parse)
      .then(readUser)
      .then(sign)
      .then(token => ({ token }))
      .then(resolve)
      .catch(reject)
  }
}
