const Koa        = require('koa')

const getenv     = require('getenv')

const logger     = require('koa-logger')

const mount = require('koa-mount')
const serve = require('koa-static')

const router     = require('./lib/routes/images')

// Settings

const PORT = getenv.int('NODE_PORT', 8080)

//

const app = new Koa()

app.use(logger())

app.use(router())
app.use(mount('/images', serve('./assets')))

//

const greet = _ =>
  console.log(`Server listening to http://localhost:${PORT}`)

app.listen(PORT, greet)
