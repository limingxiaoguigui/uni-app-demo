<template>
    <view @click="handleClick">
        <slot></slot>
    </view>
</template>

<script>
  export default {
    name: 'goDetail',
    props:{
      list:Array,
      index:Number,
    },
    methods: {
      handleClick(){
        //缓存数据
        getApp().globalData.imgList=this.list;
        getApp().globalData.imgIndex=this.index;
        console.log(this.list,this.index);
        //实现跳转
        uni.navigateTo({
          url:"/pages/imgDetail/index"
        })
      }
    }
  };
</script>

<style scoped>

</style>
