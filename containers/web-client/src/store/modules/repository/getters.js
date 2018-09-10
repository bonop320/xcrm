import {
  values,
  prop,
  compose,
  map,
  assoc
} from 'ramda'

const products = compose(values, prop('products'))

const txs = state => {
  const { products, transactions } = state

  const of = _id => products[_id]

  const it = tx => {
    const product = of(tx.subject)

    return product
      ? assoc('name', product.name, tx)
      : tx
  }

  return transactions
    ? map(it, transactions)
    : []
}

export {
  products,
  txs
}
