const config = require("../config");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient({
  host: config.IPFS_HOST,
  port: config.IPFS_PORT,
  protocol: config.IPFS_OPTIONS.protocol,
});


const gc = async () => {
  try {
    let res = await ipfs.repo.gc()
    console.log(res)
  } catch (error) {
    console.log('err: '+ error.message)
  }
 
}

gc()