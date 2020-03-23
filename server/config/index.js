module.exports = {
  secret:'gallery',
  DB: process.env.MONGODB_URI|| 'mongodb://127.0.0.1:27017/gallery',  // 'mongodb://mongo:27017/test'
  SERVER: {
    PORT: process.env.PORT || 8000
  },
}
