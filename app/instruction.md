# day1
1.路由分析
前端路由：KV键值对
key:URL
value:相应路由组件
Home首页路由组件 Search路由组件 Login登录路由
非路由组件：
Header Footer
2.项目采用less样式 浏览器不识别less样式 需要通过less,less-loader进行处理less 将less样式变为css样式
3.App.vue中引入组件 一定要注册
4.默认样式一定要清除 <link rel="stylesheet" href="./reset.css">
5.路由组件vue-router Home Search Login Register
-components文件夹：经常放置非路由组件
-pages|views文件夹：放置路由组件
配置路由 一般放在router文件夹中
6.路由和非路由组件的区别
#路由组件需要在router文件夹中注册 非路由组件使用时以标签的形式使用
$route:一般获取路由信息[路径、query、params等]
$router:一般进行编程式导航进行路由跳转[push|replace]
7.重定向 使得项目跑起来自动跳转到指定页面
redirect
8.路由跳转
声明式导航router-link,路由跳转
编程式导航push|replace,路由跳转
声明式导航能做到的编程式导航都可以 编程式导航可以做一些其他的业务逻辑
9.显示和隐藏
通过在路由组件中规定meta:{show:true}来表明非组件是否显示 精简代码
10.路由传参
params参数：属于路径当中一部分 配置路由时需要占位
query参数：不属于路径当中一部分 类似于ajax中的queryString 不需要占位
#11.路由传参（对象方法）注意事项
可以name 可以path 但是path写法不能传递params参数可以传递query参数 没有params跳转时页面都不会显示 因为params占位了 但是没有传递
指定params参数可以传递或者不传递 在占位的后面加？ /search:keyword?
params参数可以传递可以不传递  如果传递为空串路径跳转错误  使用undefined
# 路由组件能不能传递props 路由组件只能传递params的props 一般函数形式传递
props:($route)=>{
     return {keyword:$route.params.keyword,k:$route.query.k};
}



#Day2
1.编程式路由跳转到当前路由（参数不变）,多次执行会抛出NavigationDuplicated的警告错误（声明式导航没有这个问题）
编程式导航：原因 vue-router引入promise 多次执行会抛出错误
解决：1）通过push写好成功和失败回调函数
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()={},()=>{})
2)this（search） this.$router为VueRouter类的一个实例  VueRouter原型上有一个方法为push this.$router可以使用push  根本在原型上push方法
2.call与apply
修改函数上下文 this替换为第一个参数
相同点：可以调用函数一次 篡改函数上下文一次
不同点：call传递参数用逗号隔开  apply方法执行传递数组  
3.全局组件 只需注册一次 在全局任意地方使用
#4.为什么二次封装axios
请求、响应拦截器：请求拦截器可以在发请求之前处理一些业务 响应拦截器 服务器数据返回以后处理事情
5.服务器之间没有跨域 浏览器之间才有跨域
6.nprogress进度条

#7. vuex
--一个插件 状态管理库  集中式管理项目中组件共用的数据  引入要注册
--state mutations actions getters modules
--vuex可以实现模块化开发

8.一级分类动态添加背景颜色
第一种：采用样式完成
第二种：通过JS完成
##9.卡顿现象
节流：在规定的间隔事件范围内不会重复触发回调 只有大于这个时间间隔才会触发回调  把频繁触发变为少量触发
防抖：前面所有的触发都会取消  最后一次执行在规定时间之后才会触发
lodash插件：里面封装函数的防抖与节流业务 
防抖：debounce函数 自己写插件（闭包+延时器）
节流：throttle 在回调函数中规定好时间即可  给浏览器充裕的时间解析代码

# 10.三级联动路由跳转
方法：编程式导航+事件委派
1）使用route-link容易出现卡顿 因为route-link是一个组件 在操作的时候需要频繁的操作DOM所以会出现卡顿 消耗内存 （声明式导航）
2）编程式导航 通过route.push在循环的时候造成的回调函数过多
3）利用事件委派 将方法卸载父节点上 子节点事件委派给父节点 但是无法判断具体那个子节点委派的
采用自定义属性进行判断单独赋予权限

11.Search中TypeNav商品分类 （过渡动画）
1）home展示栏一直展示 search鼠标离开不展示
2）过渡动画:前提组件|元素务必要有v-if|v-show指令才能进行过渡动画
#12.
1）优化  考虑性能 不会频繁刷新数据库数据
将dispatch(category)挂载到app.vue下 只执行一次 页面进入就刷新数据
不能放在main.js this不知道是谁 没有组件就不会有$

13.合并params和query
1）现在：从三级分类跳转search指代query参数 从搜索跳转search只带params 无法实现两个参数都携带
2）通过判断是否有query和params参数 如果有则带上这两个参数

14.mock的使用  创造模拟数据 拦截ajax请求 不会与后端服务器产生影响
1)src文件夹中创建mock文件夹
2)准备JSON数据
3)mock数据需要的图片放置在public文件夹中[public文件夹在打包的时候，会把相应的资源缘分不懂打包到dist文件夹中]
4）开始mock 通过mockjs
webpack默认对外暴露：图片、JSON数据格式
5)mockServe.js文件在入口文件中引入（至少执行一次，才能模拟数据）


#15.问题unknow type :action
解决：const home/search 然后暴露才能找到  不能没有名字直接写vuex
16.使用swpier实现轮播图
#17.能挂载就说明有结构 但是在异步执行中组件中要有数据挂载后才能显示 
1）updata可以实现 因为数据发生变化的时候 空数组可以变为有数据的数组 但是数据增多比较复杂
2) 通过setTimeout实现异步 先获取数据再页面更新
3）终极  watch  单独的watch  但也是v-for执行完之后才行 可以结合nextTick
   nextTick:下次DOM更新之后执行延迟回调函数
   
18.floor数据不能在floor内部派发 因为有两个floor 不能分清到底是那个 无法v-for两个floor组件
19.v-for可以在自定义标签中使用

#DAY 3
1.组件通信方式
props:用于父子组件通信
自定义时间：@on @emit可以实现子给父通信
全局事件总线：$bus 全能
pubsub-js:vue当中几乎不用 全能
插槽 vuex
2.首页轮播图拆分为一个公用的全局组件
4.search模块开发
5.home中的数据没有分级 一个组件一个组件的实现  search数据分级 需要借助getter方法进行简化
getter直接获得小仓库中的数据 不需要经过大仓库
5.传递多个参数 可以使用Object.assign合并参数  所有参数合并到一起
Object.assign(this.searchParams,this.$route.query,this.$route.params)
6.在mounted中只执行一次  所以发送请求只能发送一次  比如选择手机得到结果 在搜索框再搜索不会再发送请求
7.命名空间问题
//因为开了命名空间 所以mapGetters必须加search
...mapGetters('search',['goodsList'])
8.多次在搜索框中搜索数据
问题：mounted只能挂载一次 所以请求只能发送一次  数据怎么整合
1）数据整合：Object.assign 将数据整合到一起（关键字  参数）
2）整合好的数据 在派发的时候要带着请求数据
3）通过watch监听路由的变化 不断发送请求
9.分页器展示
1)pageNo字段代表当前页数
2)每一个展示多少条数据 pageSize字段进行代表
3)分页器一共有多少条数据 total字段进行代表
4)分页器奇数对称展示
5)continues 分页连续页码个数
各种展示条件都要判断

#DAY4
1.开发产品详情页  
1）静态组件 （详情页的组件 还没有注册为路由组件）
点击商品图片 跳转到详情页面 路由跳转的时候带上产品的ID
#2滚动行为 
切换新的路由时 保持跳转到页面的时候用页面位置 scrollBehavior
2)发送请求
3)获取产品信息
3.注意在来回传参的时候可能是空的 一般加上||{} 不然控制台报错
4.带async返回的一定是promise 可以判断服务器是否成功接收到了数据
#5 加入购物车成功时不需要捞数据  因为只需要把前端数据带给服务器 不需要服务器返回数据  所以只进行派发即可
注意要进行判断 后端是否接收到数据 通过try catch
#6 成功路由跳转与参数传递
浏览器存储功能： HTML5中新增，本地存储和会话存储  都不能存对象 一般存的是字符串  先把对象转为字符串
本地存储：持久化---5M
会话存储：并非持久化
#7 v-show v-if
v-show 不管初始条件是什么，元素总是会被渲染 只是简单地切换元素的CSS property display
v-if 真正的条件渲染 初始渲染时条件为假则什么也不做 知道条件第一次变为真时才开始渲染条件块
#8. ...mapGetters('detail',['categoryView', 'skuInfo', 'spuSaleAttrList']),不仅要获取数据 还要将数据渲染到detail页面中  因为开了命名空间


#DAY5
1.要通过登录注册说明添加购物车的商品是谁的
向服务器发送请求 请求购物车的数据 后端无法返回数据 因为他不知道是谁在发送请求 不知道把什么数据返回给哪个用户
uuid生成临时游客身份
在axios二次封装里面 请求头要携带uuid字段给服务器
2.动态展示购物车
3.async await实现异步操作
js是单线程执行模型
原理：遇到await函数执行会返回 等到触发的异步操作完成后并且调用栈清空 载接着执行函数体内后面的语句
4.修改购物车产品的数量
1)修改产品个数【函数节流】防止快速操作出现负数
2)删除某一个产品
3)删除选中的全部商品  没有一次性全部删除的接口
通过context获取数据信息
context:小仓库 commit getter dispatch state[当前仓库数据】
promise.all([p1,p2,p3])
里面每一个都是promise对象 如果有一个失败 都失败 都成功则成功



#Day6登录 注册
1.asserts 放置全局公用的静态资源 样式中可以使用别名 ~@表示url
2.获取验证码的接口 /api/user/passaport/sendCode/{phone}
3.@click.prevent组织触发dom的原始事件  执行特定事件 比如跳转链接上有标签引起的别的字符 加上prevent可以去掉
4.登录成功时，后台为了区分用户，服务器下发token(令牌：唯一标识符)
5.vuex仓库存储数据---不是持久化
6.登录的时候派发action 登录名显示在页面 但是刷新之后没有继续派发action  所以登录名消失  通过localStorage.setItem存储到本地
#7.路由导航
表示路由正在发生改变
全局守卫 
路由独享守卫 
组件内守卫
1）首先是有无token判断
有token是登录状态  判断是否去登录页面 去登录页面直接返回home 不去登录页面判断是否含有用户信息  没有用户信息要捞数据进行派发 有用户信息直接放行 还要注意token过期问题
无token是未登录
#8.统一登录账号
13700000000 111111
1.别在生命周期函数中添加async
2.element-ui直接全局注册 但是太占内存 第二种使用哪个引入那个 第三种挂在原型上