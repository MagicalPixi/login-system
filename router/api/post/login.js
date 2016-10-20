/**
 * Created by zyg on 16/10/4.
 */
//@flow
var UserBasicMessage = require('../../../types/UserBasicMessage');
var validateUser = require('../../../services/validateUser');
var cache = require('../../../services/cache')
var qs = require('qs');
var url = require('url');

var addQuery = (url, params) => {
  if (!/\?/.test(url)) {
    url += '?'
  }
  var paramStr = Object.keys(params).map((k)=> {
    return `${k}=${params[k]}`;
  }).join('&');
  return url + encodeURI(paramStr)
}

var saveAuthId = authId => {
  var shortid = require('shortid')
  var encode = require('../../../services/utils/encode')
  authId = authId || shortid.generate()
  var redis = require('../../../services/redis')
  var time = new Date().getTime() + 2 * 3600 * 1000
  var auth = encode(authId)
  return redis.set(authId, time.getTime()).then(value => {
    return {time: time, authId: authId, auth: auth}
  })
}

module.exports = function *() {
  var encode = require('../../../services/utils/encode')
  var username = this.req.body.username
  var password = this.req.body.password
  var result = yield validateUser(username, password)
  if (result) {
    var urlObj = url.parse(this.req.headers.referer);
    if (urlObj.query) {
      var qs = require('qs')
      var query = qs.parse(urlObj.query)
      if (query.redirectTo) {
        var cb = yield saveAuthId(query.authId)
        var redirect = addQuery(decodeURIComponent(query.redirectTo), cb)
        this.redirect(redirect)
      } else {
        this.redirect(this.req.headers.referer)
      }
    } else {
      this.redirect(this.req.headers.referer)
    }
  } else {
    this.redirect(this.req.headers.referer)
  }
}
