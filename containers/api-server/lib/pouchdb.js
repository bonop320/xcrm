const getenv = require('getenv')

const PouchDB = require('pouchdb')

const upsertPlugin = require('pouchdb-upsert')
const findPlugin = require('pouchdb-find')

PouchDB
  .plugin(upsertPlugin)
  .plugin(findPlugin)

const POUCHDB_URL = getenv('COUCHDB_URL', 'http://localhost:5984')

function main (name) {
  const url = `${POUCHDB_URL}/${name}`
  return new PouchDB(url)
}

module.exports = main
