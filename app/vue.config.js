// const { defineConfig } = require('@vue/cli-service')
//这里将module.exports（{}）修改为module.export{}
module.exports = {
  transpileDependencies: true,
//  eslint关闭校验
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        changeOrigin:true
      }
    },
    //配置自动打开浏览器的地址
    host:'localhost',
    port:8080
  }
}
