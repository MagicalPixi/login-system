/**
 * Created by zyg on 16/8/8.
 */

var checkExpire = (authId) => {
  var redis = require('../../services/redis')
    return redis.get(authId).then(value => {
      var data = value.data
      console.log(data)
      return new Promise(resolve => {
        var current = new Date()
        resolve(!data || isNaN(data) || data < current.getTime())
      })
    })
}

var checkAuthIdValid = (authId, auth) => {
  var enode = require('../../services/utils/encode')
  return encode(authId) == auth
}

var checkAuth = (query) => {
  var redirect
  if (query.authId && query.auth && checkAuthIdValid(query.authId, query.auth)) {
    redirect = decodeURIComponent(query.redirectTo)
  }
  return redirect
}

module.exports = function *(next){
  var query = this.query
  var redirect
  if (redirect = checkAuth(query)) {
    var expire = yield checkExpire(query.authId)
    if (!expire) {
      this.redirect(redirect)
    } else {
      yield this.render('index')
    }
  } else {
    yield this.render('index')
  }
}
