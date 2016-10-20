/**
 * Created by zyg on 16/10/5.
 */

var cache = require('../../../services/cache')

module.exports = function *() {

  var authId = this.req.query.authId;

  var status = 401;
  var body = {
    success:false
  };

  if(cache.get(authId)){
    status = 200;
    body = {
      success:true
    }
  }

  this.status =  status;
  this.body = body;
};
