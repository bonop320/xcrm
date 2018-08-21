const Router = require('koa-router')

const create = require('./create')
const read = require('./read')

//

const SCOPE = 'users'

//

const routerFor = name => {
  const options = {
    prefix: `/${name}`
  }

  const router = new Router(options)

  return router
}

// Helpers
function install () {
  const router = routerFor(SCOPE)

  router
    .post('/', create())
    .get('/:id', read())

  return router.routes()
}

module.exports = install
