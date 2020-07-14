const fs = require('fs')
const path = require('path')

;(async () => {
  await fs.unlinkSync('D:\\workspace\\lab\\gallery\\server\\uploads\\timg.jpg')
  console.log('111')
})()
