const R = require('ramda')

/**
 *
 * @typedef {Object} ProductTransferRequest
 * @property {String} source
 * @property {String} target
 * @property {String} subject
 * @property {Number} amount
 */

const {
  curry,
  assoc
} = R

//

const rejected = code => {
  const err = new Error(code)
  return Promise.reject(err)
}


const incrOfBy = curry(
  async function (db, sub, delta, _id) {
    await db.upsert(_id, doc => {
      const amount = doc[sub] || 0
      return assoc(sub, amount + delta, doc)
    })

    return db.get(_id)
  }
)

async function perform (db, payload) {
  const { source, target } = payload
  const { subject, amount } = payload

  const incrBy = incrOfBy(db, subject)

  const insert = incrBy(amount)
  const remove = incrBy(-amount)

  const resolveWithRepos = repos =>
    assoc('repos', repos, payload)

  switch (payload.action) {
    case 'allocate':
      return Promise
        .all([ remove(source), insert(target) ])
        .then(resolveWithRepos)

    case 'insert':
      return Promise
        .all([ insert(target) ])
        .then(resolveWithRepos)

    case 'remove':
      return Promise
        .all([ remove(source) ])
        .then(resolveWithRepos)
  }
}

/**
 * Insert product into repo
 *
 * @sig
 *
 * insert :: PouchDB -> ProductTransferRequest -> ProductTransferResult
 */

module.exports = curry(perform)
