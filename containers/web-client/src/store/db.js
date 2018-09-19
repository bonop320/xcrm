import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'
import upsertPlugin from 'pouchdb-upsert'

import state from './state'

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)

function main () {
  const { user } = state
  const name = `node_${user._id}`
  const url = `http://localhost:8081/couchdb/${name}`

  return new PouchDB(url)
}

module.exports = main()
