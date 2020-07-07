const ipfsClient = require('ipfs-http-client')
const { globSource } = ipfsClient

const ipfs = ipfsClient('http://localhost:5001')

// get config
// ipfs.config.getAll().then((data) => console.log(data))

// ipfs version
// ipfs.version().then((v) => console.log(v))

module.exports = {
  version: async () => {
    let v = await ipfs.version()
    return v.version
  },
  pin: async () => {
    for await (const { cid, type } of ipfs.pin.ls()) {
      console.log({ cid, type }, i)
    }
  },
  rm: async (file) => {
    ipfs.rm(file)
  },
  add: async (files) => {
    // const files = [
    //     {
    //       path: '/tmp/myfile.txt', // 文件名称
    //       content: 'ABC', // 文件内容
    //     },
    //   ]

    for await (const result of ipfs.add(files)) {
      console.log(result)
    }
  },
}
;(async () => {
  const files = [
    {
      path: '/tmp/myfile.txt', // 文件名称
      content: 'ABC', // 文件内容
    },
  ]

  for await (const result of ipfs.add(files)) {
    console.log(result)
  }
})()
