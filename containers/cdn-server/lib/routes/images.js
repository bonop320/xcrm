const path = require('path')

const Router = require('koa-router')

const getenv = require('getenv')

const busboy = require('../middlewares/busboy')

//

const SCOPE = 'images'

const DEST = getenv('ASSETS_DIR', './assets')

//

const routerFor = name => {
  const options = {
    prefix: `/${name}`
  }

  const router = new Router(options)

  return router
}

// Helpers

function create () {

  return async ctx => {
    const { request, db } = ctx

    const [ file ] = request.files

    const image = path.basename(file.path)

    ctx.body = { image }
  }
}

function install () {
  const router = routerFor(SCOPE)

  router
    .post('/',
      busboy(DEST),
      create())

  return router.routes()
}

module.exports = install
