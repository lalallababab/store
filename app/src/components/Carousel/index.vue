<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(carousel,index) in list"
           :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch:{
    list:{
      immediate:true,
      //v-for执行完毕 才有结构(在watch当中没办法保证的)
      handler(newValue,oldValue){
        this.$nextTick(()=>{
          var mySwiper = new Swiper (
              //通过ref获取dom
              this.$refs.cur,
              {
                loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                  // 点击小球进行图片切换
                  clickable:true
                },

                // 如果需要前进后退按钮
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>