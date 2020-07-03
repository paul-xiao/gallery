const request = require('./utils/request')
request('baidu.com')
  .then(data)
  .catch((err) => console.log(err))
