const getenv = require('getenv')

const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')
const upsertPlugin = require('pouchdb-upsert')

const COUCHDB_URL = getenv('COUCHDB_URL', 'http://localhost:5984')

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)

function main (name) {
  const url = `${COUCHDB_URL}/${name}`
  return new PouchDB(url)
}

module.exports = main
