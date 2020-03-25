module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/api/ipfs': {
        target: 'http://localhost:8080/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 3000
  }
}