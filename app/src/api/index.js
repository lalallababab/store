//对所有的api接口进行统一管理
import requests from './request';
import mockAjax from "@/api/mockAjax";
//三级联动接口
//    发送请求
export const reqGetCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
//mock模块 发送请求
export const reqGetBannerList = ()=>mockAjax.get('/banner');
//获取floor数据
export const reqGetFloorList = ()=>mockAjax.get('/floor');
//获取搜索模块数据  带的参数至少是一个空对象 不然会报错
export const reGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})
//获取商品详情请求
export const reqGetGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});
//获取加入购物车之后详情
export const reqGetAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
//获取购物车列表数据接口
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'});
//删除购物车产品
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//修改商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
//获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
//注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});
//登录
export const reqUserLogin = (data)=>requests({url:'user/passport/login',data,method:'post'});
//获取用户信息[需要带着用户的token向服务器要用户信息]
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});
//退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'});
//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取商品清单
export const reqOrderInfo =()=>requests({url:'/order/auth/trade',method:'get'})
//提交订单
export const reqSubmitOrder =(trade,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
//获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,methods:'get'})
//获取支付订单状态
export const reqPayStatus = (orderId)=>requests({url:`/apyment/weixin/queryPayStatus/${orderId}`,method:'get'})
//获取个人中心数据
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})