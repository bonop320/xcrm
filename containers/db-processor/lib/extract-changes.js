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

const seqDict = {}

function getLastSeqOf (source) {
  return dbOf('seqs')
    .get(source)
    .then(res => {
      return res.last_seq
    })
    .catch(err => {
      console.log(err)
      return 0
    })
}

const register = source => res => {
  const { results, last_seq } = res

  const resolve = always(results)

  return dbOf('seqs')
    .upsert(source, merge({ last_seq }))
    .then(resolve)
    .catch(console.error)
}

function main (_id) {
  const db = dbOf(`node_${_id}`)

  const pack = body => ({
    source: _id,
    doc: body.doc
  })

  const p = getLastSeqOf(_id)
    .then(since => {
      const options = {
        since,
        include_docs: true
      }

      return db
        .changes(options)
        .then(register(_id))
    })
    .then(map(pack))

  return Observable
    .fromPromise(p)
    .flatMap(identity)
}

module.exports = main
