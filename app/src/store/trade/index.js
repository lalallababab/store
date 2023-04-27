//登陆与注册
//home仓库
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import {reqAddressInfo, reqOrderInfo} from '@/api';


const trade = {
    namespaced: true,
//仓库存储数据的地方 从本地获取token
    state: {
        address: [],
        orderInfo:[],
    },

//修改state的唯一手段
    mutations: {
        GETUSERADDRESS(state, address) {
            state.address = address;
        },
        GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo
        }
    },
    getters: {},
//不允许修改state中的数据
    actions: {
        //    获取用户地址信息
        async getUserAddress({commit}) {
            let result = await reqAddressInfo();
            if (result.code == 200) {
                commit('GETUSERADDRESS', result.data);
            }
        },
        //    获取商品信息
        async getOrderInfo({commit}) {
            let result = await reqOrderInfo();
            console.log(result)
            if (result.code == 200) {
                commit('GETORDERINFO', result.data);
            }
        }
    },


}
export default trade
