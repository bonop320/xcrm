/**
 * @param {Object} data
 * @param {string} source
 * @param {Object} doc
 */

function main (params) {
  const { source, doc } = params

  const {
    type,
    action,
    subject,
    target,
    amount,
    price
  } = doc

  if (type !== 'txs' || action !== 'transfer') {
    return []
  }

  const time = new Date()
  const total = amount * price

  return [
    {
      source: source,
      doc: {
        type: 'receivables',
        time,
        subject,
        total,
        target: target
      }
    }, {
      source: target,
      doc: {
        type: 'payables',
        time,
        subject,
        total,
        target: source
      }
    }
  ]
}

module.exports = main
