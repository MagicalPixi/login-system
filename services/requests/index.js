var path = require('path')
var fs = require('fs')

var jsFileRegExp = /\.js$/
var Request = require('../basic/baseRequest')
var requests = {}
var dir = path.resolve(__dirname, './')
var files = fs.readdirSync(dir)
var models = files.filter(file => {
  return jsFileRegExp.test(file) && file != 'index.js'
}).map(file => {
  return file.replace(jsFileRegExp, '')
}).forEach(model => {
  var currentmodel = require('./' + model)
  currentmodel.name = currentmodel.name || model
  var request = Request(currentmodel)
  requests[model] = request
})

module.exports = requests
