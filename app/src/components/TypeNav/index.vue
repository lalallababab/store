<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <!--        离开父亲才会触发鼠标事件-->
        <h2 class="all">全部商品分类</h2>
        <!--        添加过渡动画-->
        <transition name="sort">
          <div class="sort" @click="goSearch" v-show="show">
            <!--          一级分类循环展示-->
            <div class="all-sort-list2" >
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                <!--            鼠标监控  ！！！ 不要忘记传递参数-->
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data_category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!--            二三级分类  采用js样式-->
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <!--              二级分类循环展示 为c1.categoryChild-->
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data_category2Id="c2.categoryId">
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName"
                             :data_category3Id="c3.categoryId">
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">买买买超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//仓库数据加载完毕
import {mapState} from 'vuex';
import _ from "lodash";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },
//  组件挂载完毕 通知Vuex发请求 获取数据 存储在仓库中
  mounted() {
    // eslint-disable-next-line no-cond-assign
    //如果不是Home路由组件 将typeNav进行隐藏
    if (this.$route.path != '/home') {
      this.show = false;
    }
    console.log(this.$store)
  },
  computed: {
    ...mapState({
      //右侧为一个函数 使用这个计算属性时 函数会立即执行一次
      //注入一个参数state 为大仓库中的数据 包含home 和search
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
     // 点击鼠标修改响应式
    changeIndex: _.throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    goSearch(event) {
      //通过定义data-categoryName判断是不是a标签
      let element = event.target;
      //dataset可以获取节点的自定义属性与属性值
      // eslint-disable-next-line no-unused-vars
      let {categoryname, category1id, category2id, category3id} = element.dataset
      if (categoryname) {
        //  路由跳转参数
        let location = {name: "search"};
        let query = {categoryName: categoryname};
        //  判断是几级标签 通过绑定自定义属性
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //  整理完参数  带参数的路由跳转
        //   判断：如果路由跳转的时候，有params参数，捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          //  动态给location配置对象添加query属性
          location.query = query;
          //  参数整合完毕后路由跳转
          this.$router.push(location);
        }
        //  路由跳转  注意是router不是route
        this.$router.push(location);
      }
    },
    //鼠标进入展开
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true;
      }
    },
    //离开时分类关闭
    leaveShow() {
      //只有在search页面才会这样
      if (this.$route.path != '/home') {
        this.show = false;
      }
      this.currentIndex = -1;
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;


      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    ////鼠标移到哪里哪里就变换颜色
    //.cur {
    //  background: skyblue;
    //}
    //  过渡动画样式 进入
    .sort-enter {
      height: 0px;
    }

    //  过渡动画结束
    .sort-enter-to {
      height: 461px;
    }

    //  动画时间、速率
    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>