const getenv     = require('getenv')

const Koa        = require('koa')

const logger     = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const auth       = require('./lib/auth')
const txs        = require('./lib/txs')
const resources  = require('./lib/resources')

const pouchdb    = require('./lib/middlewares/pouchdb')
const router     = require('./lib/routes')

// Settings

const PORT = getenv.int('NODE_PORT', 8080)

const SCOPES = [
  'users',
  'products',
  'txs',
  'invoices',
  'payments'
]

//

const app = new Koa()

app.use(logger())
app.use(bodyparser())

app.use(auth())
app.use(txs())
app.use(resources())

app.use(pouchdb(SCOPES))
app.use(router())

//

const greet = _ =>
  console.log(`Server listening to http://localhost:${PORT}`)

app.listen(PORT, greet)
