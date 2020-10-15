const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  devServer: {
    hot: true,
    proxy: {
      '/static': {
        target: 'http://localhost:3001/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/static': '',
        },
        logLevel: 'debug',
      },
      '/api/user': {
        target: 'http://localhost:3001/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
        logLevel: 'debug',
      },
      '/api/post': {
        target: 'http://localhost:3001/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
        logLevel: 'debug',
      },
      '/api/ipfs': {
        target: 'http://localhost:8080/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
        logLevel: 'debug',
      },
    },
    port: 8888,
  },
}
