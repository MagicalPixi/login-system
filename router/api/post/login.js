/**
 * Created by zyg on 16/10/4.
 */

var UserBasicMessage = require('../../../types/UserBasicMessage');

var validateUser = require('../../../services/validateUser');

var cache = require('../../../services/cache')

var qs = require('qs');
var url = require('url');

module.exports = function *() {
  
  var n = this.req.body.name;
  var p = this.req.body.ps;

  console.log(this.url,this.req.headers.referer);

  var urlObj = url.parse(this.req.headers.referer);
  var query = qs.parse(urlObj.search.replace(/^\?/,''));

  var userMessage = new UserBasicMessage(n,p);

  var r = yield validateUser(userMessage);

  console.log('validate result:',r);

  if(r){
    cache.set(query.key,true);
    this.redirect(decodeURIComponent(query.redirectTo));
  }else{
    this.redirect(this.req.headers.referer);
  }
};