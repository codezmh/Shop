module.exports = {

  devServer: {

    open: true,

    /* 使用代理 */

    proxy: {

      '/api': {

        target: 'http://localhost:4000/', //设置你调用的接口域名和端口号 别忘了加http

        changeOrigin: true, //允许跨域

        pathRewrite: {

          '^/api': '' // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://localhost:8090/users'，直接写‘/api/users’即可

        }

      }

    }

  }

}