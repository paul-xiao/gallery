const ipfs = require('./ipfsClient')
const path = require('path')

;(async () => {
  for await (const { cid, type } of ipfs.pin.ls()) {
    console.log({ cid, type })
  }
})()
