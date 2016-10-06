/**
 * Created by zyg on 16/10/4.
 */

var BasicUser = require('../model/BasicUser');


/**
 * @param UserBasicMessage obj
 */
module.exports = (obj)=> {
  log('obj:',obj);
  
  obj = Object.assign({},obj);

  return BasicUser.findOne(obj)
    .then(result=> {

      log('result:', result)

      return new Promise(resolve=> {
        resolve(!!result)
      })
    });
};