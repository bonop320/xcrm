const { assoc } = require('ramda')

function main () {
  return async ctx => {
    const { query, state } = ctx

    const { invoices } = ctx.db

    const { user } = ctx.state

    const selector = user.role === 'admin'
      ? query
      : assoc('book', state.user._id, query)

    ctx.body = await invoices
      .find({ selector })
      .then(res => res.docs)
  }
}

module.exports = main
