/**
 * Created by zyg on 16/10/4.
 */

module.exports = (username, password)=> {
  var common = require('mp_common')
  var config = require('../config')
  var user = common.request(config.dbserver.domin)('pixi', 'user')
  var header = common.header.server(config.common.server_key)
  return user.get({username: username}, header).then(value => {
    var data = value.data
    return new Promise(resolve => {
      if (data && data.password && data.password == common.encode(password)) {
        resolve(data)
      } else {
        resolve(null)
      }
    })
  })
};
