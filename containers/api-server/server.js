const getenv     = require('getenv')

const Koa        = require('koa')

const logger     = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const jwt        = require('koa-jwt')

const pouchdb    = require('./lib/middlewares/pouchdb')
const router     = require('./lib/routes')

// Settings

const PORT = getenv.int('NODE_PORT', 8080)

const JWT_SECRET = getenv('JWT_SECRET')

const SCOPES = [
  'users',
  'products',
  'products_txs'
]

//

const app = new Koa()

app.use(logger())
app.use(bodyparser())

app.use(jwt({ secret: JWT_SECRET }).unless({ path: [/^\/(tokens|repos)/] }))

app.use(pouchdb(SCOPES))
app.use(router())

//

const greet = _ =>
  console.log(`Server listening to http://localhost:${PORT}`)

app.listen(PORT, greet)
