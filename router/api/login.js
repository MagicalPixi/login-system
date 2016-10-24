/**
 * Created by zyg on 16/10/4.
 */
//@flow
var validateUser = require('../../services/validateUser');
var qs = require('qs');
var url = require('url');
var config = require('../../config')
var common = require('mp_common')

module.exports = function *() {
  var username = this.req.body.username
  var password = this.req.body.password
  var result = yield validateUser(username, password)
  if (result && this.req.headers.referer) {
    var uid = result.id
    var urlObj = url.parse(this.req.headers.referer);
    if (urlObj.query && qs.parse(urlObj.query) && qs.parse(urlObj.query).redirectTo) {
      var query = qs.parse(urlObj.query)
      var expire_time = new Date().getTime() + 2 * 3600 * 1000
      var redirect = common.StringUtil.addQuery(decodeURIComponent(query.redirectTo), common.auth.generate(uid, expire_time, query.authId))
      this.redirect(redirect)
    } else {
      this.redirect(this.req.headers.referer)
    }
  } else {
    this.redirect(this.req.headers.referer)
  }
}
