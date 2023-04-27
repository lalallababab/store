import Vue from 'vue';
import Vuex from 'vuex';

import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api';
//需要使用插件一次
Vue.use(Vuex);
const shopcart = {
    namespaced: true,
//仓库存储数据的地方
    state: {
        cartList:[],
    },
//修改state的唯一手段
    mutations: {
        GETCARTLIST(state,cartList){
            state.cartList = cartList
        }
    },
//不允许修改state中的数据
    actions: {
        //获取购物车列表数据
        async getCartList({commit}) {
            let result = await reqCartList();
            if(result.code == 200){
                commit("GETCARTLIST",result.data);
            }else{
                return Promise.reject(new Error('fail'));
            }
        },
    //    删除购物车列表数据
        async deleteCartListBySkuId({commit},skuId){
            let result = await reqDeleteCartById(skuId);
        },
    //   更新购物车数据状态
        async updateCheckedById({commit},{skuId,isChecked}){
            let result = await reqUpdateCheckedById(skuId,isChecked);
            if(result.code==200){
                return 'ok';
            }else{
                return Promise.reject(new Error('faile'));
            }
        },
        //    批量删除选中商品
        async deleteAllCheckedCart({dispatch,getters}){
            //context:小仓库 commit getter dispatch state[当前仓库数据】
            //  通过遍历获取全部数据
            //   console.log(getters)
            let PromiseAll = [];
            getters.cartList.cartInfoList.forEach(item=>{
                let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
                // 将每一次返回的Promise都添加到数组中
                PromiseAll.push(promise);
            });
            //通过Promise.all判断是否有失败的
            return Promise.all(PromiseAll);
        },
    //    修改全部商品状态  通过调用别的dispatch
        async updateAllCartIsChecked({dispatch,state},isChecked){
            let promiseAll = [];
            state.cartList[0].cartInfoList.forEach(item=>{
                let promise = dispatch("updateCheckedById",{skuId:item.skuId,isChecked});
                promiseAll.push(promise);
            });
        //    返回最终结果
            return Promise.all(promiseAll);
        }
    },
    getters: {
        cartList(state){
            return state.cartList[0]||{};
        },
    //    计算出购物车的数据
        cartInfoList(state){

        }
    }
}
export default shopcart