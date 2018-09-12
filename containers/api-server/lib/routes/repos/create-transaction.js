const { ulid } = require('ulid')

const {
  compose,
  over,
  tap,
  curry,
  assoc,
  merge,
  lensPath,
  path,
  assocPath,
  defaultTo
} = require('ramda')

//
const incrOfBy = curry(
  async function (db, sub, delta, _id) {
    const amountLens = lensPath(['repo', sub])

    await db.upsert(over(amountLens, x => (x || 0) + delta))

    return db.get(_id)
  }
)

const createTransaction = curry(
  async function (db, payload) {
    const _id = ulid()

    const body = assoc('time', new Date(), payload)

    return db
      .upsert(_id, merge(body))
      .then(res => db.get(res.id))
  }
)

const applyTransaction = curry(
  async function (db, payload) {
    const { source, target, subject } = payload

    const amount = Number(payload.amount)

    const incrBy = incrOfBy(db, subject)

    const insert = incrBy(amount)
    const remove = incrBy(-amount)

    const resolveWithRepos = repos =>
      assoc('repos', repos, payload)

    switch (payload.action) {
      case 'transfer':
        return Promise
          .all([ remove(source), insert(target) ])
          .then(resolveWithRepos)

      case 'insert':
        return Promise
          .all([ insert(source) ])
          .then(resolveWithRepos)

      case 'remove':
        return Promise
          .all([ remove(source) ])
          .then(resolveWithRepos)

      case 'sell':
        return Promise
          .all([ remove(source) ])
          .then(resolveWithRepos)
    }
  }
)

//
function main () {

  return async ctx => {
    const { db, request, params } = ctx

    const res = await Promise
      .resolve(request.body)
      .then(assoc('source', params._id))
      .then(createTransaction(db.repos_transactions))
      .then(tap(console.log))
      .then(applyTransaction(db.users))
      .catch(console.error)

    ctx.body = res
  }
}

module.exports = main
