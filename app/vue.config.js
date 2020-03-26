module.exports = {
  devServer: {
    hot: true,
    proxy: {
      '/api/user': {
        target: 'http://localhost:3001/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        },
        logLevel: 'debug'
      },
      '/api/ipfs': {
        target: 'http://localhost:8080/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        },
        logLevel: 'debug'
      }
    },
    port: 3000
  }
}