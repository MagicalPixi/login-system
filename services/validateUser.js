/**
 * Created by zyg on 16/10/4.
 */


module.exports = (username, password)=> {
  var encode = require('./utils/encode')
  var user = require('./requests').user
  return user.get({username: username}).then(value => {
    var data = value.data
    return new Promise(resolve => {
      resolve(data.password == encode(password))
    })
  })
};
