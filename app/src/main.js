//程序入口  最先执行 也只执行一次
Vue.config.productionTip = false
import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router';
//引入仓库
import store from './store';
//三级联动 引入全局组件
import TypeNav from '@/components/TypeNav';
//引入全局组件轮播图
import Carousel from '@/components/Carousel';
//引入swiper样式
//引入分页器
import Pagination from '@/components/Pagination'
//引入轮播图样式
import "swiper/css/swiper.css"
//统一接口api文件夹里面全部函数请求
import * as API from '@/api';
//引入elment-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//第一个参数为全局组件名字 第二个参数为那个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入MockServer.js 因为没有暴露 所以执行一次才行
import '@/mock/mockServe';
//引入二维码生成器
//测试后端是否连接成功
// import {reqGetCategoryList,reqGetBannerList} from "@/api";
// console.log(reqGetCategoryList());
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  //设置全局时间总线 用来传递参数 this为VM
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
//  注册仓库 组件实例身上会多一个属性$store
  store
}).$mount('#app')
