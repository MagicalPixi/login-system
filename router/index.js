/**
 * Created by zyg on 16/8/8.
 */
var path = require('path')
var router = require('koa-router')();
var login = require('./api/login')

router.get('/',  function *(next) {
  yield this.render('index')
})

router.post('/api/login', login)

module.exports = router;
