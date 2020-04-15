const config = require("../config");
const ipfsClient = require("ipfs-http-client");
const { info } = require("./logger");

const ipfs = ipfsClient({
  host: config.IPFS_HOST,
  port: config.IPFS_PORT,
  protocol: config.IPFS_OPTIONS.protocol,
});

const foo = async () => {
  const v = await ipfs.version();
  console.log("ipfs is on, version:", v.version);
};

module.exports = {
  addFile(files) {
    return new Promise(async (resolve, reject) => {
      const source = ipfs.add([...files]);
      const result = [];
      try {
        for await (const file of source) {
          result.push(file);
        }

        resolve(
          result.map((e, i) => {
            const { name, type } = files[i];
            const { path, size } = e;
            return {
              path,
              size,
              name,
              type,
            };
          })
        );
      } catch (err) {
        reject(err);
      }
    });
  },
  // unpin mutiple files
  unpin: (files) => {
      return new Promise(async(reslove, reject) => {
        for(file of files) {
          const hash = file.path
          info(`unpinning '${hash}'`);
          try {
            // recursive: false
            await ipfs.pin.rm(hash);
          } catch (error) {
            console.log(error)
          }
        }
        info(`running gc`);
        try {
          let res = await ipfs.repo.gc()
          console.log(res)
          // for(let entry  of res ){
          //   console.log(entry.cid.toString())
          // }
        } catch (error) {
          console.log('err: '+ error.message)
        }
        reslove()
      })
  }
};

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
