const ASSETS_DIR = __dirname + '/assets'

const apps = [{
  name   : 'Assets',
  script : 'server.js',
  env: {
    ASSETS_DIR
  }
}]

module.exports = { apps }
