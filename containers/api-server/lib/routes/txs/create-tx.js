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
  evolve({ amount: Number }),
  pick([ 'subject', 'amount', 'action' ])
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
    const { txs } = db

    const tagBook = assoc('book', book)

    const put = body =>
      txs.put(body)

    const get = res =>
      txs.get(res.id)

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
    const { products, invoices } = db

    const parse = compose(
      tagId,
      tagTime,
      assoc('tx', tx._id),
      pick([
        'subject',
        'amount',
        'source',
        'book'
      ])
    )

    const convertAmount = tx => {
      const update = doc => {
        const amount = doc.price * tx.amount
        return assoc('amount', amount, tx)
      }

      return products
        .get(tx.subject)
        .then(update)
    }

    const put = body =>
      invoices.put(body)

    const get = res =>
      invoices.get(res.id)

    return Promise
      .resolve(tx)
      .then(convertAmount)
      .then(parse)
      .then(put)
      .then(get)
  }
)

function main () {

  return async (ctx, next) => {
    const { db, request, params, state } = ctx

    const createTx = txBuilder(db)
    const createInvoice = invoiceBuilder(db)

    // extract relevant fields
    const agent   = state.user._id
    const patient = request.body.patient

    const body = txFrom(request.body)

    switch (body.action) {
      case 'transfer':
        const tx = await Promise
          .resolve(body)
          .then(assoc('target', patient))
          .then(createTx(agent))

        await Promise
          .resolve(body)
          .then(assoc('action', 'receive'))
          .then(assoc('source', agent))
          .then(assoc('rel', tx._id))
          .then(createTx(patient))
          .then(createInvoice)

        ctx.body = tx

        break

      default:
        ctx.body = await createTx(agent, body)

        break
    }

    return next()
  }
}

module.exports = main
