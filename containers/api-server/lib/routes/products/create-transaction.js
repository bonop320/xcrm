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
const createTransaction = curry(
  async function (db, payload) {
    const _id = ulid()

    const body = assoc('time', new Date(), payload)

    return db
      .upsert(_id, merge(body))
      .then(res => db.get(res.id))
  }
)

const incrOfBy = curry(
  async function (db, product_id, delta, _id) {
    const amountLens = lensPath(['repo', product_id])

    await db
      .upsert(_id, over(amountLens, x => (x || 0) + delta))
      .catch(console.error)

    await db.get(_id).then(console.log)

    return db.get(_id)
  }
)

const applyTransaction = curry(
  async function (db, payload) {
    const { source, target, subject } = payload

    const amount = Number(payload.amount)

    const incrBy = incrOfBy(db, subject)

    const insert = incrBy(amount)
    const remove = incrBy(-amount)

    switch (payload.action) {
      case 'transfer':
        return Promise
          .all([ remove(source), insert(target) ])

      case 'insert':
        console.log('exo')
        return Promise
          .all([ insert(source) ])

      case 'remove':
        return Promise
          .all([ remove(source) ])

      case 'sell':
        return Promise
          .all([ remove(source) ])
    }
  }
)

//
function main () {

  return async ctx => {
    const { db, request, params, state } = ctx

    const res = await Promise
      .resolve(request.body)
      .then(assoc('subject', params._id))
      .then(assoc('source', state.user._id))
      .then(createTransaction(db.products_txs))
      .then(applyTransaction(db.users))
      .then(tap(console.log))
      .catch(console.error)

    ctx.body = res
  }
}

module.exports = main
