//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//引入store
import store from "@/store";
//使用插件
Vue.use(VueRouter)
//引入路由组件
import routes from './routes'
let originPush = VueRouter.prototype.push;
//重写push|replace location为传递那些参数
VueRouter.prototype.push = function (location,resoleve,reject){
    if(resoleve&&reject){
        originPush.call(this,location,resoleve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
//配置路由
let router =  new VueRouter({
//    配置路由
    routes,
    scrollBehavior(to,from,savedPosition){
    //    y=0 返回页面时滚动条在最上方
        return {y:0};
    },
});
//全局守卫 前置守卫（路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
//    next为放行函数
//   全部放行  next();
//  放行到指定路由   next('/login')
//    1.先全部放行
//    2.判断是否登录 如果登录一定会有token
    let token = store.state.user.token
    //3.用户信息 不能用是否为空判断 空对象永远是真  要用对象里面的属性判断
    let name = store.state.user.userInfo.name;
    //4.如果已经登录 则不可以去login 界面
    if(token){
        //登录去的login
        if(to.path=='/login'){
            next('/home')
        }else{
        //登录去的不是login  放行
            if(name){
            //    用户信息存在
                next();
            }else{
            //    用户信息不存在 捞数据 派发action让仓库存储用户信息再跳转
                try{
                    //获取用户信息
                    await store.dispatch('user/getUserInfo');
                    next();
                }catch (error){
                //    捞不到数据  token过期 清除token
                    await store.dispatch('user/userLogout');
                    next('/login')
                }
            }
        }
    }else{
    //    未登录
        next();
    }
});
export default router;