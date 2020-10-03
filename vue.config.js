const {
  MiniAppZipWebpackPlugin,
  getEntries
} = require('@kugou-miniapp/cli-service')
const {
  prepareUrls
} = require('@kugou-miniapp/cli-shared-utils')

module.exports = {
  devServer: {
    proxy: {
      //请求路径 带有 / demo 的走代理 http://localhost:8081/
      '/demo': {
        target: 'http://localhost:8081/dev-api', //代理为什么 ip:端口
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/demo': '' //表示将路径重写为 http://localhost:8081/demo
        }
      }
    },
  },
  chainWebpack: config => {
    config
      .externals({
        'mini-app': 'MiniApp'
      })

    if (process.env.VUE_APP_DEVTOOL && process.env.NODE_ENV === 'development') {
      const urls = prepareUrls('http', '0.0.0.0')

      config
        .plugin('define')
        .tap(args => {
          args[0]['process.env.DEVTOOL_HOST'] = JSON.stringify(urls.lanUrlForConfig)
          args[0]['process.env.DEVTOOL_PORT'] = JSON.stringify(8098)

          return args
        })
    }

    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('mini-app-zip')
        .use(MiniAppZipWebpackPlugin, [{
          r: [{
            name: "index",
            content: "all"
          }],
          t: 'dist',
          d: 'dist'
        }])
    }
  },
  pages: getEntries(),
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/styles/mixins.scss"
        `
      },
      scss: {
        prependData: `
        @import "~@/styles/mixins.scss";
        `
      }
    }
  }
}