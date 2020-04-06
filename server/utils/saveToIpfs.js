import ipfsClient from "ipfs-http-client";

class SaveToIpfs {
  constructor() {
    this.result;
    this.err;
    this.ipfs = ipfsClient("/ip4/127.0.0.1/tcp/5001");
  }
  async saveToIpfs(files) {
    const source = this.ipfs.add([...files], {
      progress: prog => console.log(`received: ${prog}`)
    });
    try {
      for await (const file of source) {
        this.result = { path: file.path};
      }
    } catch (err) {
      this.err = err;
    }
  }
}

export default async(files) => {
  const task = new SaveToIpfs();
  await task.saveToIpfs(files)
   return new Promise((resolve, reject) => {
    if(task.result && task.result.path) {
      resolve(task.result)
    } else {
      reject(task.err)
    }
   })
  
};
