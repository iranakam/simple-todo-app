const { environment } = require('@rails/webpacker')
const custom = require('./custom')

environment.config.merge(custom)

const vue =  require('./loaders/vue')
const html = require('./loaders/html')
const css = require('./loaders/css')

environment.loaders.append('html', html)
environment.loaders.append('vue', vue)
environment.loaders.append('css', css)

environment.devtool = 'eval'
module.exports = environment
