const { ulid } = require('ulid')

const { assoc } = require('ramda')

const dbOf = require('./db')

const stamped = x =>
  assoc('_id', ulid(), x)

function main (record) {
  const { source, doc } = record

  return dbOf(`node_${source}`)
    .put(stamped(doc))
}

module.exports = main
