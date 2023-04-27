//模拟服务器
//对axios进行二次封装
import axios from "axios";
//引入进度条 start为开始 done为结束
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
//1.利用axios对象方法create 创建axios实例
//2.request就是axios 需要配置一下
const requests = axios.create({
//    基础路由 写地址的时候都会加上
    baseURL:'/mock',
//    超时时间设置
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
//    config:配置对象  有一个很重要的属性headers请求头
//    进度条开始东
    nprogress.start();
    return config;
})
//响应拦截器  响应成功响应失败
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();
    return res.data;

// eslint-disable-next-line no-unused-vars
},(error)=>{console.log('出现错误')})


//封装好要暴露
export default requests;