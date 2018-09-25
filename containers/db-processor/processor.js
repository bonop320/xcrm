const {
  tap,
  identity,
  unless,
  isEmpty,
  where,
  whereEq
} = require('ramda')

const getUsers = require('./lib/streams/user-dbs')
const adminChanges = require('./lib/admin-changes')
const extractChanges = require('./lib/extract-changes')
const processTxs = require('./lib/process-txs')
const insertRecords = require('./lib/insert-records')

adminChanges()
  .flatMap(processTxs)
  .flatMap(insertRecords)
  .subscribe(console.log)
