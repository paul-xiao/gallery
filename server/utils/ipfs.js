const config = require("../config");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient({
  host: config.IPFS_HOST,
  port: config.IPFS_PORT,
  protocol: config.IPFS_OPTIONS.protocol,
});

const foo = async () => {
  const v = await ipfs.version();
  console.log('ipfs is on, version:',v.version);
};


module.exports = {
 addFile(files){
    return new Promise( async (resolve, reject) => {
      const source = ipfs.add([...files]);
      try {
        for await (const file of source) {
          resolve(file)
        }
      } catch (err) {
        reject(err)
      }
    })
}
}

foo();
// class SaveToIpfs {
//   constructor() {
//     this.result;
//     this.err;
//     this.ipfs = ipfs;
//   }
//   async saveToIpfs(files) {
//     const source = this.ipfs.add([...files], {
//       progress: prog => console.log(`received: ${prog}`)
//     });
//     try {
//       for await (const file of source) {
//         this.result = { path: file.path};
//       }
//     } catch (err) {
//       this.err = err;
//     }
//   }
// }

// export default async(files) => {
//   const task = new SaveToIpfs();
//   await task.saveToIpfs(files)
//    return new Promise((resolve, reject) => {
//     if(task.result && task.result.path) {
//       resolve(task.result)
//     } else {
//       reject(task.err)
//     }
//    })

// };
