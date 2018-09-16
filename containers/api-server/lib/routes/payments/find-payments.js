const { keys } = require('ramda')

const filterForUser = collection => user => {
  return user.role === 'admin'
    ? {}
    : { book: user._id }
}

const findIn = collection => selector => {
  return collection
    .find({ selector })
    .then(res => res.docs)
}

function main () {
  return async ctx => {
    const { db, state } = ctx

    const resolve = data => {
      ctx.status = 200
      ctx.body = data
    }

    await Promise
      .resolve(state.user)
      .then(filterForUser(db.users))
      .then(findIn(db.payments))
      .then(resolve)
  }
}

module.exports = main
