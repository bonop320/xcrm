const { assoc } = require('ramda')

const { createIn } = require('./helpers')

function main () {
  return async ctx => {
    const { db, request, state } = ctx

    ctx.body = await Promise
      .resolve(request.body)
      .then(assoc('issuer', state.user._id))
      .then(createIn(db))
  }
}


module.exports = main
