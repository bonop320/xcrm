const { createHmac } = require('crypto')

const { curry } = require('ramda')

const hashFrom = (secret, input) =>
  createHmac('sha256', secret)
    .update(input)
    .digest('hex')

module.exports.hashFrom = curry(hashFrom)
