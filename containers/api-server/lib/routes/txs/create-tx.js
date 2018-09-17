const { ulid } = require('ulid')

const {
  tap,
  curry,
  assoc,
  dissoc,
  evolve,
  pick,
  compose
} = require('ramda')

const { allP } = require('ramda-adjunct')

/**
 * Helpers
 */

const tagId = x =>
  assoc('_id', ulid(), x)

const tagTime = x =>
  assoc('time', new Date(), x)

const txFrom = compose(
  evolve({
    amount: Number,
    price: Number
  }),
  pick([
    'subject',
    'amount',
    'price',
    'action',
    'target'
  ])
)

/**
 * Methods
 */

/**
 * Transaction processor
 *
 * @async
 *
 * @param {Object} db - dict of dbs
 * @param {string} book - coresponding user id
 * @param {Object} body - details
 * @param {string} body.subject - product id
 * @param {string} body.action -
 * @param {number} body.amount -
 * @param {string} [body.source] - source book if "received"
 * @param {string} [body.target] - target book if "transferred"
 *
 * @returns {Promise<Object>}
 */

const txBuilder = curry(
  async function (db, book, body) {
    const tagBook = assoc('book', book)

    const put = body =>
      db.put(body)

    const get = res =>
      db.get(res.id)

    return Promise
      .resolve(body)
      .then(compose(tagId, tagTime, tagBook))
      .then(put)
      .then(get)
  }
)

/**
 * Invoice processor
 *
 * @async
 *
 * @param {Object} db - dict of dbs
 * @param {Object} tx - source transaction
 *
 * @returns {Promise<Object>}
 */


const invoiceBuilder = curry(
  async function (db, tx) {
    const parse = compose(
      tagId,
      tagTime,
      assoc('total', tx.amount * tx.price),
      assoc('tx', tx._id),
      pick([
        'subject',
        'amount',
        'price',
        'source',
        'book'
      ])
    )

    const put = body =>
      db.put(body)

    const get = res =>
      db.get(res.id)

    return Promise
      .resolve(tx)
      .then(parse)
      .then(put)
      .then(get)
  }
)

function main () {

  return async (ctx, next) => {
    const { db, request, params, state } = ctx

    const createTx = txBuilder(db.txs)
    const createInvoice = invoiceBuilder(db.invoices)

    // extract relevant fields
    const source = state.user._id
    const target = request.body.target

    const body = txFrom(request.body)

    switch (body.action) {
      case 'transfer':
        const tx = await Promise
          .resolve(body)
          .then(createTx(source))

        await Promise
          .resolve(body)
          .then(assoc('action', 'receive'))
          .then(assoc('source', source))
          .then(assoc('rel', tx._id))
          .then(createTx(target))
          .then(createInvoice)

        ctx.body = tx

        break

      default:
        ctx.body = await createTx(source, body)

        break
    }

    return next()
  }
}

module.exports = main
