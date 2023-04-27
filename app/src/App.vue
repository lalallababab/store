<!--根目录 不管怎么跳转 根组件只会执行一次-->
<template>
  <div>
    <Header></Header>
<!--      路由组件出口的地方-->
    <router-view></router-view>
<!--    在home、search显示 在登录、注册隐藏  通过meta精简代码-->
<!--    <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer>-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from './components/Header'
import Footer from './components/Footer'
import {reqGetBannerList} from "@/api";
import {reqGetCategoryList} from "@/api";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //派发一个action获取商品分类的三级列表的数据
    this.$store.dispatch('home/getCategoryList');
  },
//  获取首页轮播图的数据
  getBannerList(){
    reqGetBannerList();
  }
}
</script>

<style>


</style>
