//大仓库里面引入小仓库
import Vue from 'vue';
import  Vuex from 'vuex';


//需要使用插件一次
Vue.use(Vuex);
//引入小仓库
import home from './home'
import search from './search';
import detail from "./detail";
import shopcart from "@/store/shopcart";
import user from "@/store/user";
import trade from "@/store/trade"

// export default new Vuex.Store({
//     modules:{
//         home,
//         search
//     }
// })
const store = new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    },
})
export default store
