
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-web-share.cjs.production.min.js')
} else {
  module.exports = require('./react-web-share.cjs.development.js')
}
