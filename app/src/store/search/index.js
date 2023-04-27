//仓库分为小仓库 search仓库  仓库中实现数据的展示和修改
import Vue from 'vue';
import Vuex from 'vuex';

import {reGetSearchInfo} from '@/api';
//需要使用插件一次
Vue.use(Vuex);
const search = {
    namespaced: true,
//仓库存储数据的地方
    state: {
        searchList: {}
    },
//修改state的唯一手段
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    },
//不允许修改state中的数据
    actions: {
        //    获取search中的数据
        async getSearchList({commit}, params) {
            let result = await reGetSearchInfo(params)
            if (result.code == 200) {
                commit('GETSEARCHLIST', result.data);
            }
        }
    },
    getters : {
        //此时的state为当前仓库数据 并非大仓库属性
        goodsList(state) {
            return state.searchList.goodsList || [];
        },
        attrsList(state) {
            return state.searchList.attrsList;
        },
        trademarkList(state) {
            return state.searchList.trademarkList;
        }
    }
}
export default search
// //仓库存储数据的地方
// const state ={};
// //修改state的唯一手段
// const mutations = {};
// //可以书写自己的业务逻辑 处理异步
// const actions = {};
// //计算属性
// const getters = {};
// //对外暴露Store类的一个实例
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters
// })