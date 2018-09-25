import PouchDB from 'pouchdb'

import findPlugin from 'pouchdb-find'
import upsertPlugin from 'pouchdb-upsert'

import {
  assoc,
  compose,
  curry,
  merge
} from 'ramda'

import { ulid } from 'ulid'

import state from './state'

PouchDB
  .plugin(findPlugin)
  .plugin(upsertPlugin)

function getUrl () {
  const { host } = window.location
  const { user } = state

  if (user) return `http://${host}/couchdb/node_${user._id}`
}

const dbUrl = getUrl()

const db = dbUrl && new PouchDB(dbUrl)

// db methods

const getIn = curry(
  function (type, id) {
    const _id = id._id || id.id || id

    return db.get(_id)
  }
)

const putIn = curry(
  function (type, body) {
    const complete = compose(
      merge({
        type,
        time: new Date()
      }),
      merge(body)
    )

    const put = body =>
      db.upsert(ulid(), complete)

    return Promise
      .resolve(body)
      .then(put)
      .then(getIn(type))
  }
)

const findIn = curry(
  function (type, selector) {
    const query = {
      selector: assoc('type', type, selector)
    }

    return db
      .find(query)
      .then(res => res.docs)
  }
)

export default db

export {
  getIn,
  putIn,
  findIn
}
