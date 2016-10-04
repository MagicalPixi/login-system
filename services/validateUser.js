/**
 * Created by zyg on 16/10/4.
 */

var UserBasicMessage = require('../types/UserBasicMessage')

/**
 * @param UserBasicMessage obj
 */
module.exports = (obj)=>{

  return new Promise((r,j)=>{

    if(obj instanceof UserBasicMessage){

      console.log(obj)

      r(obj.username === obj.ps);
      
    }else{
      throw 'UserBasicMessage!'
    }
  })
};