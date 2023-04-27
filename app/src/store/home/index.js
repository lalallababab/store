//home仓库
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import {reqGetBannerList, reqGetCategoryList, reqGetFloorList} from '@/api';

const home = {
    namespaced: true,
//仓库存储数据的地方
    state: {
        //根据接口返回值 初始化的 接口返回值为数组
        categoryList: [],
        bannerList: [],
        floorList:[]
    },

//修改state的唯一手段
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList;
        },
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList;
        },
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList;
        }
    },
    getters: {},
//不允许修改state中的数据
    actions: {
        //向服务器发送请求 获取服务器数据
        // categoryList(){
        //     let result = reqCategoryList();
        //     console.log(result)
        // }
        async getCategoryList({commit}) {
            let result = await reqGetCategoryList();
            if (result.code == 200) {
                //commit调用mutation来修改保存数据
                commit('CATEGORYLIST', result.data)
            }
        },
        async getBannerList({commit}) {
            let result = await reqGetBannerList();
            if (result.code == 200) {
                //commit调用mutation来修改保存数据
                commit('GETBANNERLIST', result.data)
            }
        },
        async getFloorList({commit}) {
            let result = await reqGetFloorList();
            if (result.code == 200) {
                //commit调用mutation来修改保存数据
                commit('GETFLOORLIST', result.data)
            }
        }
    }
}
export default home

