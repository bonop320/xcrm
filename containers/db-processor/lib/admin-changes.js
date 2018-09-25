const { Observable } = require('rxjs/Rx')

const {
  tap,
  identity,
  pluck,
  map,
  merge,
  always
} = require('ramda')

const dbOf = require('./db')

function main () {
  const db = dbOf('node_admin')

  const pack = ([body]) => ({
    source: 'admin',
    doc: body.doc
  })

  const options = {
    since: 'now',
    include_docs: true,
    live: true,
    timeout: false
  }

  const changes = db.changes(options)

  return Observable
    .fromEvent(changes, 'change')
    .map(pack)
}

module.exports = main

