module.exports = {
  secret:'gallery',
  DB: process.env.MONGODB_URI|| 'mongodb://127.0.0.1:27017/gallery',  // 'mongodb://mongo:27017/test'
  SERVER: {
    PORT: process.env.PORT || 3001
  },
  IPFS_HOST: process.env.IPFS_HOST || '127.0.0.1',
  IPFS_PORT: process.env.IPFS_PORT || '5001',
  IPFS_OPTIONS: {protocol: 'http'},
}
