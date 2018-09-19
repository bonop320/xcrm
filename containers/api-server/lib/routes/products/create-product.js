const {
  createIn
} = require('./helpers')

function main () {
  return async ctx => {
    const { request, db } = ctx

    ctx.body = await Promise
      .resolve(request.body)
      .then(createIn(db.products))
      .then(console.log)

    ctx.status = 200
  }
}


module.exports = main
