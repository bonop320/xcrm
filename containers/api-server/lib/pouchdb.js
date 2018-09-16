const PouchDB = require('pouchdb')

const upsert = require('pouchdb-upsert')

PouchDB.plugin(upsert)

module.exports = PouchDB
