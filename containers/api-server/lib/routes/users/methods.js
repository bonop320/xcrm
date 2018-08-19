const {
  curry,
  pick,
  evolve,
  compose,
  trim
} = require('ramda')

const md5 = require('md5')

function create (db, body) {
  const relevant = pick([
    'name',
    'phone',
    'password'
  ])

  const sanitize = evolve({
    name     : trim,
    phone    : trim,
    password : md5
  })

  return Promise
    .resolve(body)
    .then(compose(sanitize, relevant))
    // .then(x => db.put(x))
    // .then(console.log)
}

module.exports.create = curry(create)
