const extract = require('./lib/extract')
const apply = require('./lib/apply')


function main () {
  console.log('Processing txs')

  extract()
    .concatMap(apply)
    .subscribe(console.log, console.error, main)
}

main()
