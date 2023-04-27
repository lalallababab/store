//登陆与注册
//home仓库
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import {reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo,reqLogout} from '@/api';
import {getToken, setToken, removeToken, getUserTempId} from "@/utils/token";
import {getUUID} from "@/utils/uuid_token";

const user = {
    namespaced: true,
//仓库存储数据的地方 从本地获取token
    state: {
        code: '',
        token: getToken(),
        userInfo: {},
        userTempId:getUUID()
    },

//修改state的唯一手段
    mutations: {
        GETCODE(state, code) {
            state.code = code;
        },
        USERLOGIN(state, token) {
            state.token = token
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        //退出登录 用户信息清空
        CLEAR(state){
            state.token = '';
            state.userInfo={};
            removeToken();
        }
    },
    getters: {},
//不允许修改state中的数据
    actions: {
        //向服务器发送请求 获取服务器数据
        async getCode({commit}, phone) {
            let result = await reqGetCode(phone);
            if (result == 200) {
                commit('GETCODE', result.data);
                Message.warning({
                    message:"您的验证码是:"+result.data,
                    duration:7000
                })
                console.log("您的验证码是："+result.data);
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        //    用户点击注册
        async userRegister({commit}, user) {
            let result = await reqUserRegister(user);
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        //    登录业务 需要进行校验
        async userLogin({commit}, data) {
            let result = await reqUserLogin(data);
            if (result.code == 200) {
                commit('USERLOGIN', result.data.token);
                //选择了保存登录
                if(isKeepSecret){
                    sessionStorage.setItem("AUTOLOGIN",JSON.stringify({
                        phone,
                        password,
                    }))
                }
                //    本地持久化存储token  使得登录信息一致存在页面中
               setToken(result.data.token)
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //登录用户展示
        async getUserInfo({commit}) {
            let result = await reqUserInfo();
            if (result.data == 200) {
                commit('GETUSERINFO', result.data);
                return "OK";
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        async userLogout({commit}){
            let result = await reqLogout();
            if(result==200){
                commit('CLEAR');
                return 'ok';
            }else{
                return Promise.reject(new Error('faile'))
            }
        }
    },

}
export default user
