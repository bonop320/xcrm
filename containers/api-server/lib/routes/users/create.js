const {
  compose,
  trim,
  prop,
  applySpec,
  replace
} = require('ramda')

const md5 = require('md5')

// generic helpers

const trimmedProp = key =>
  compose(trim, prop(key))

const hashedProp = key =>
  compose(md5, prop(key))

const numberFrom = compose(
  Number,
  replace(/[^\d]/g, '')
)

// domain helpers

const phoneOf = compose(numberFrom, prop('phone'))
const hashOf = compose(md5, prop('password'))
const nameOf = trimmedProp('name')
const idOf = compose(String, phoneOf)

//

module.exports = () => {
  // format
  const parse = applySpec({
    _id   : idOf,
    name  : nameOf,
    phone : phoneOf,
    hash  : hashOf
  })

  return function createUser (ctx) {
    const { db, request } = ctx

    const insert = data => {
      const { users } = db

      return users
        .put(data)
        .then(res => users.get(res.id))
    }

    const resolve = res => {
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
      .then(insert)
      .then(resolve)
      .catch(reject)
  }
}
