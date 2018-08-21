const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')

const getenv = require('getenv')

const {
  map,
  concat,
  zipObj
} = require('ramda')

// Settings

const HOST = getenv('COUCHDB_URL', 'http://localhost:5984')

//

const urlsFor = map(concat(`${HOST}`))
const dbsFor = map(url => new PouchDB(url))

const connectTo = scopes => {
  const urls = urlsFor(scopes)
  const dbs = dbsFor(urls)

  return zipObj(scopes, dbs)
}

//

PouchDB.plugin(findPlugin)

//

module.exports = (scopes = []) => {
  const db = connectTo(scopes)

  function pouchdb (ctx, next) {
    ctx.db = db

    return next()
  }

  return pouchdb
}
