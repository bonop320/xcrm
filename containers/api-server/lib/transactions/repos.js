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


async function incrBy (db, sub, delta, _id) {
  await db.upsert(_id, doc => {
    const amount = doc[sub] || 0
    return assoc(sub, amount + delta, doc)
  })

  return db.get(_id)
}

const incrByCurried = curry(incrBy)


async function perform (db, payload) {
  const { source, target } = payload
  const { subject, amount } = payload

  const incr = incrByCurried(db, subject)

  const incrOn = incr(amount)
  const decrOn = incr(-amount)

  const resolveWithRepos = repos =>
    assoc('repos', repos, payload)

  switch (payload.action) {
    case 'allocate':
      return Promise
        .all([ decrOn(source), incrOn(target) ])
        .then(resolveWithRepos)

    case 'insert':
      return Promise
        .all([ incrOn(target) ])
        .then(resolveWithRepos)

    case 'remove':
      return Promise
        .all([ decrOn(source) ])
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
