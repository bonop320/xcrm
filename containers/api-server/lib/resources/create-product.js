const {
  createIn
} = require('./helpers')

function main () {
  return async ctx => {
    const { request, db } = ctx

    ctx.body = await Promise
      .resolve(request.body)
      .then(createIn(db))
  }
}


module.exports = main
