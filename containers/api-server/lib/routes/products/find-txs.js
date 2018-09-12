const {
  curry,
  map
} = require('ramda')

function main () {
  return async ctx => {
    const { db, params, query, state } = ctx

    const selector = {
      subject: params._id,
      $or: [
        { target: state.user._id },
        { source: state.user._id }
      ]
    }

    const { limit, skip } = map(Number, query)

    ctx.body = await db.products_txs
      .find({ selector, limit, skip })
      .then(res => res.docs)
  }
}

module.exports = main
