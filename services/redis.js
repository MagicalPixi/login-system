
var axios = require('axios')
var redisUrl = 'http://db.magicalpixi.com/redis/'

module.exports = {
  get: (key) => {
    return axios.get(redisUrl + key)
  },
  set: (key, value) => {
    return axios.post(redisUrl + key, {value: value})
  }
}
