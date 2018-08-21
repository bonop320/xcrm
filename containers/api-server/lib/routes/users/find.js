const {
  map,
  dissoc
} = require('ramda')

module.exports = () => {
  const ensafeAll = map(dissoc('hash'))

  return function findUsers (ctx) {
    const { db, request } = ctx

    const resolve = res => {
      ctx.body = res
      ctx.status = 200
    }

    const find = selector => {
      const { users } = db

      return users
        .find({ selector })
        .then(res => res.docs)
        .then(ensafeAll)
    }

    return Promise
      .resolve(request.query)
      .then(find)
      .then(resolve)
  }
}
