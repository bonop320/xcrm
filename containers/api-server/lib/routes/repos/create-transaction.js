const { ulid } = require('ulid')

const {
  curry,
  assoc,
  merge
} = require('ramda')

const FIELDS = [
  '_id',
  'name',
  'price',
  'image'
]

//
const incrOfBy = curry(
  async function (db, sub, delta, _id) {
    await db.upsert(_id, doc => {
      const value = Number(doc[sub]) || 0
      return assoc(sub, value + Number(delta), doc)
    })

    return db.get(_id)
  }
)

const createTransaction = curry(
  async function (db, body) {
    const _id = ulid()

    return db
      .upsert(_id, merge(body))
      .then(res => db.get(res.id))
  }
)

const applyTransaction = curry(
  async function (db, payload) {
    const { source, target } = payload
    const { subject, amount } = payload

    const incrBy = incrOfBy(db, subject)

    const insert = incrBy(amount)
    const remove = incrBy(-amount)

    const resolveWithRepos = repos =>
      assoc('repos', repos, payload)

    switch (payload.type) {
      case 'allocate':
        return Promise
          .all([ remove(source), insert(target) ])
          .then(resolveWithRepos)

      case 'insert':
        return Promise
          .all([ insert(target) ])
          .then(resolveWithRepos)

      case 'remove':
        return Promise
          .all([ remove(source) ])
          .then(resolveWithRepos)
    }
  }
)

//
function main () {

  return async ctx => {
    const { db, request } = ctx

    const res = await Promise
      .resolve(request.body)
      .then(createTransaction(db.repos_transactions))
      .then(applyTransaction(db.repos))
      .catch(console.error)

    console.log(res)

    ctx.body = res
  }
}

module.exports = main
