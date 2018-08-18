const busboy = require('koa-busboy')

const { ulid } = require('ulid')

const fnDestFilename = (fieldname, filename) =>
  ulid() + filename

module.exports = dest =>
  busboy({ dest, fnDestFilename })
