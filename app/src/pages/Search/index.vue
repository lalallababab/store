<template>
  <div>
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--           分类的面包屑-->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <!--           关键字的面包屑-->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!--            品牌的面包屑-->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                @click="removeTrademark">×</i></li>
            <!--          平台售卖属性面包屑 遍历数组-->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{
                attrValue.split(":")[1]
              }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <!--        绑定一个自定义事件-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)">
                  <a href="#">综合<span v-show="isOne" class="iconfont" :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a href="#">价格<span v-show="isTwo" class="iconfont" :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!--          销售商品列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
<!--                    点击进入商品详情页-->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html"
                       title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>

<!--          分页器：测试分页器阶段 数据会替换-->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
// eslint-disable-next-line no-unused-vars
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
// eslint-disable-next-line no-unused-vars
import search from "@/store/search";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: '',
  components: {
    SearchSelector
  },
  data() {
    return {
      //  将参数传给服务器
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",

      }
    }
  },
  //组件挂载完毕之前将数据传入
  beforeMount() {
    //  复杂写法  需要什么参数 要一一写出得到
    //   this.searchParams.categoryName=this.$route.query.categoryName
    //  Object.assign:es6新增语法 合并对象  参数整理只整理一次
    Object.assign(this.searchParams, this.$route.query, this.$route.params)

  },
  mounted() {
    this.getData();
  },
  computed: {
    //因为开了命名空间 所以mapGetters必须加search
    ...mapGetters('search', ['goodsList']),
    isOne(){
      return this.searchParams.order.indexOf('1')!=-1;
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1;
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc')!=-1;
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1;
    },
  //  获取search模块展示产品一共多少数据
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  //数据监听 监听组件实力身上的属性的属性值变化
  watch: {
    //  监听属性  在点击不同种类时route是在变化的  监听路由信息是否发生变化  发生变化就要再发送请求 改变mounted只能发送一次请求的缺点
    $route() {
      // console.log(11) 要重新整理
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      //  整理好数据再次发送请求
      this.getData();
      //  每一次请求之前 相应的1、2、3分类id置空  来接受下一次的请求
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
    },
  },
  methods: {
    getData() {
      //向服务器发送请求获取search模块数据（根据参数不同返回不同数据进行展示）  将searchParams参数带给服务器
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    //自定义回调函数 获取当前第几页
    getPageNo(pageNo){
    //  整理带给服务器的参数
      this.searchParams.pageNo = pageNo;

    //  再次发请求
      this.getData();
    },
    //收集平台属性
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //向数组中添加 可能会出现重复
      //  数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      //  发送请求 将满足请求的页面挂载出来
      this.getData()
    },
    //属性中删除传参
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      //  重新挂载页面 再次发送请求
      this.getData()
    },
    //排序操作
    changeOrder(flag){
      let originOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
    //  准备一个新的order属性值
      let newOrder = '';
      if(flag==originFlag){
        //点击的是综合
        newOrder = `${originFlag}:${originSort=="desc"?"asc":"desc"}`;
      }else{
      //  点击的是价格
        newOrder = `${flag}:${'desc'}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
    },
    removeCategoryName() {
      //移除之后不需要这个属性了 就直接undefined
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //  地址栏需要更新：进行路由跳转 将params参数也删掉了
      if (this.$route.params) {
        //params参数不删除
        this.$router.push({name: 'search', params: this.$route.params})
      }
    },
    //  自定义事件
    trademarkInfo(trademark) {
      //  整理品牌字段的参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData()
    },
    removeTrademark() {
      this.searchParams.trademark = undefined
      this.getData()
      if (this.$route.query) {
        //params参数不删除
        this.$router.push({name: 'search', query: this.$route.query})
      }
    },
    //  删除关键字
    removeKeyword() {
      //移除之后不需要这个属性了 就直接undefined

      this.searchParams.keyword = undefined;
      //再次发送请求 因为删除关键字要返回页面
      this.getData();
      //利用$bus通知兄弟组件Header中的params需要清除
      this.$bus.$emit("clear");
      //  进行路由的跳转  有query参数要带着
      if (this.$route.query) {
        //params参数不删除
        this.$router.push({name: 'search', query: this.$route.query})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>