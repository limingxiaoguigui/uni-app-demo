<template>
    <view>首页最新</view>
</template>

<script>
  export default {
    name: 'index',
    mounted() {
      //修改页面的标题
    uni.setNavigationBarTitle(
          {title: '最新'},
      );
    }
  };
</script>

<style scoped>

</style>
