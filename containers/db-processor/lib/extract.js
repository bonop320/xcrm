const { Observable } = require('rxjs/Rx')

const {
  map,
  path,
  identity
} = require('ramda')

const dbOf = require('./db')

const entriesOf = path(['doc', 'entries'])

function main () {
  const db = dbOf('txs')

  const options = {
    since: 'now',
    include_docs: true,
    live: true,
    timeout: false
  }

  const changes = db.changes(options)

  return Observable
    .fromEvent(changes, 'change')
    .flatMap(map(entriesOf))
    .filter(identity)
    .flatMap(identity)
}

module.exports = main

