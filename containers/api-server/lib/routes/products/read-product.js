const readFrom = collection => params => {
  const extractId = x =>
    x._id || x.id || x

  return Promise
    .resolve(params)
    .then(extractId)
    .then(_id => collection.get(_id))
}

function main () {
  return async ctx => {
    const { params, db } = ctx

    const resolve = data => {
      ctx.status = 200
      ctx.body = data
    }

    const reject = err => {
      ctx.status = err.status
      ctx.body = err
    }

    await Promise
      .resolve(params)
      .then(readFrom(db.products))
      .then(resolve)
      .catch(reject)
  }
}

module.exports = main
