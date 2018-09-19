const jwt = require('jsonwebtoken')

const {
  resolveTo,
  rejectTo,
  readSignedIn
} = require('./helpers')

// Settings

module.exports = opts => {
  const sign = body => {
    const token = jwt.sign(body, opts.secret)
    return { token }
  }

  return async function (ctx, next) {
    const { db, request } = ctx

    return readSignedIn(db, request.body)
      .then(sign)
      .then(resolveTo(ctx))
      .catch(rejectTo(ctx))
  }
}

