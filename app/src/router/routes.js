//路由配置信息
import Home from "@/pages/Home";
import Detail from "@/pages/Detail";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';
export default
[
    {
        //路由组件一定小写
        path: "/home",
        component: Home,
        meta: {show: true}
    },
    {
        //路由组件一定小写
        path: "/center",
        component: Center,
        meta: {show: true},
        children:[
            {
                //路由组件一定小写
                path: "myorder",
                component: MyOrder,
            },
            {
                //路由组件一定小写
                path: "grouporder",
                component:GroupOrder,
            },
        //    如果跳转失败 重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        //路由组件一定小写
        path: "/paysuccess",
        component: PaySuccess,
        meta: {show: true}
    },
    {
        //路由组件一定小写
        path: "/pay",
        component: Pay,
        meta: {show: true}
    },
    {
        //路由组件一定小写
        path: "/trade",
        component: Trade,
        meta: {show: true}
    },
    {
        //路由组件一定小写
        path: "/shopcart",
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: "/addcartsuccess",
        name:'addCartSuccess',
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        path: "/detail/:skuid",
        name:'detail',
        component: Detail,
        meta: {show: true}
    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: {show: true},
        name: "search"
    },
    {
        path: "/login",
        component: Login,
        meta: {show: false}
    },
    {
        path: "/register",
        component: Register,
        meta: {show: false}
    },
       // 重定向 项目自动跳转到指定位置
    {
        path: '*',
        redirect: '/home'
    }
]