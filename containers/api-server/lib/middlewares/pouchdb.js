const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')

const getenv = require('getenv')

// Settings

const HOST = getenv('COUCHDB_URL', 'http://localhost:5984')

//

const urlFor = (opts = {}) => {
  const { host = HOST, name } = opts
  return `${host}/${name}`
}

//

PouchDB.plugin(findPlugin)

//

module.exports = opts => {
  const db = new PouchDB(urlFor(opts))

  function pouchdb (ctx, next) {
    ctx.db = db

    return next()
  }

  return pouchdb
}
