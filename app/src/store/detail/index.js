//detail仓库
import Vue from 'vue';
import Vuex from 'vuex';
import {reqGetAddOrUpdateShopCart, reqGetGoodsInfo} from '@/api';
import {getUUID} from '@/utils/uuid_token'
Vue.use(Vuex);
const detail = {
    namespaced: true,
//仓库存储数据的地方
    state: {
        //    获取产品信息的action
        goodInfo: {},
    //    游客的临时身份
        uuid_token:getUUID()
    },
//修改state的唯一手段
    mutations: {
        GETGOODSINFO(state, goodInfo) {
            state.goodInfo = goodInfo;
        }
    },
//不允许修改state中的数据
    actions: {
        //    获取产品信息的action
        async getGoodInfo({commit}, skuId) {
            let result = await reqGetGoodsInfo(skuId);
            if (result.code == 200) {
                commit('GETGOODSINFO', result.data);
            }
        },
    //    产品添加到购物车中 返回的是一个promise结果  不需要三连环捞数据了 所以要确定服务器是收到数据了
        async addOrUpdateShopCart({commit}, {skuId, skuNum}){
            let result = await reqGetAddOrUpdateShopCart(skuId,skuNum)
            if(result.code == 200){
            //   返回成功
                return 'ok';
            }else{
            //    返回失败
                return Promise.reject(new Error("fail"));
            }
        }
    },
//    简化数据
    getters: {
        //路径导航简化的数据
        categoryView(state) {
            //不能一开始直接返回 因为是个空对象可能会报错
            return state.goodInfo.categoryView||{};
        },
        //简化产品信息的数据
        skuInfo(state) {
            return state.goodInfo.skuInfo||{};
        },
        //    产品售卖属性的简化
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList||[];
        }
    }
}
export default detail

