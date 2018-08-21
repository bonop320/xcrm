const Koa        = require('koa')

const getenv     = require('getenv')

const logger     = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const pouchdb    = require('./lib/middlewares/pouchdb')
const router     = require('./lib/routes')

// Settings

const PORT = getenv.int('NODE_PORT', 8080)

//

const app = new Koa()

app.use(logger())
app.use(bodyparser())

app.use(pouchdb(['users']))
app.use(router())

//

const greet = _ =>
  console.log(`Server listening to http://localhost:${PORT}`)

app.listen(PORT, greet)
