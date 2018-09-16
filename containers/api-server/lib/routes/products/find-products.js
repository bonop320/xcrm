const { keys } = require('ramda')

const filterForUser = collection => user => {
  if (user.role === 'admin') return {}

  return collection
    .get(user._id)
    .then(res => res.repo || {})
    .then(keys)
    .then($in => ({ _id: { $in }}))
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
      .then(findIn(db.products))
      .then(resolve)
  }
}

module.exports = main
