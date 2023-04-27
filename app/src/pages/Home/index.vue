<template>
<!--  引入注册好的三级联动组件-->
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
<!--    数据在父组件中 需要传给子组件-->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>

</template>

<script>
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex'
export default {
  name: "index",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
//  floor在home组件中派发
  mounted() {
    this.$store.dispatch('home/getFloorList');
  //  获取用户信息在首页展示
    this.$store.dispatch('user/getUserInfo');
  },
  computed:{
    ...mapState({
      floorList:(state)=>state.home.floorList,
    })
  }
}
</script>

<style scoped>

</style>