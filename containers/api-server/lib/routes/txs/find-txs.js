const { assoc } = require('ramda')

function main () {
  return async ctx => {
    const { query, state } = ctx

    const { txs } = ctx.db

    const selector = assoc('book', state.user._id, query)

    ctx.body = await txs
      .find({ selector })
      .then(res => res.docs)
  }
}

module.exports = main
