const dbOf = require('./db')

const deltaOf = entry => {
  const { amount, side } = entry

  return side === 'debit'
    ? amount
    : -amount
}

const applyTo = entry => user => {
  const { symbol } = entry

  const accounts = user.accounts || {}
  const amount = accounts[symbol] || 0

  accounts[symbol] = amount + deltaOf(entry)
  user.accounts = accounts

  return user
}

function main (entry) {
  const { account, symbol } = entry

  const db = dbOf('users')

  return db
    .get(account)
    .then(applyTo(entry))
    .then(user => db.put(user))
}

module.exports = main
