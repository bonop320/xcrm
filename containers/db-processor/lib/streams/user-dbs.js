const getenv     = require('getenv')

const { Observable } = require('rxjs/Rx')

const {
  pluck
} = require('ramda')

const dbOf = require('../db')

function fetchUsers (selector = {}) {
  return dbOf('users')
    .find({ selector })
    .then(res => res.docs)
}

function main () {
  return Observable
    .fromPromise(fetchUsers())
    .flatMap(pluck('_id'))
}

module.exports = main
