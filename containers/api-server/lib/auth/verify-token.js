const jwt = require('koa-jwt')

module.exports = opts => {
  const allowed = {
    path: [/^\/tokens/]
  }

  return jwt(opts)
    .unless(allowed)
}
