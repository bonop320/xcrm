const PouchDB = require('pouchdb')

const findPlugin = require('pouchdb-find')

PouchDB.plugin(findPlugin)

module.exports = opts => {
  const url = `${opts.host}/users`
  const db = new PouchDB(url)

  return (ctx, next) => {
    ctx.db = db

    return next()
  }
}
