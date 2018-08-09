const PouchDB = require('pouchdb')

const getenv = require('getenv')

// Settings

const HOST = getenv('COUCHDB_URL', 'http://localhost:5984')

//

module.exports = (opts = {}) => {
  const { host = HOST, name } = opts

  const url = `${host}/${name}`

  const db = new PouchDB(url)

  function pouchdb (ctx, next) {
    ctx.db = db

    return next()
  }

  return pouchdb
}
