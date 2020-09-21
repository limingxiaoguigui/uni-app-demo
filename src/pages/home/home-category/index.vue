<template>
    <view>首页分类</view>
</template>

<script>
  export default {
    name: 'index',
    mounted() {
      uni.setNavigationBarTitle(
          {title: '分类'},
      );
    },
  };
</script>

<style scoped>

</style>
