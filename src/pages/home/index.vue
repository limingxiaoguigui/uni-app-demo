<template>
    <view>
        <view class = "home_tab">
            <view class = "home_tab_title">
                <view class = "title_inner">
                    <uni-segmented-control
                        :values = "items.map(v=>v.title)"
                        :current = "current"
                        @click = "onClickItem"
                        style-type = "text"
                        active-color = "#d4237a"
                    ></uni-segmented-control>
                </view>
                <view class = "iconfont iconsearch"></view>
            </view>
            <view class = "home_tab_content">
                <view v-show = "current===0">
                    <home-recommend></home-recommend>
                </view>
                <view v-show = "current===0">
                    <home-category></home-category>
                </view>
                <view v-show = "current===0">
                    <home-new></home-new>
                </view>
                <view v-show = "current===0">
                    <home-album></home-album>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
  //引入
  import homeAlbum from './home-album';
  import homeCategory from './home-category';
  import homeNew from './home-new';
  import homeRecommend from './home-recommend';
  //分段器
  import {uniSegmentedControl} from '@dcloudio/uni-ui';

  export default {
    name: 'index.vue',
    //注册
    components: {
      homeAlbum,
      homeCategory,
      homeNew,
      homeRecommend,
      uniSegmentedControl,
    },
    data() {
      return {
        items: [
          {title: '推荐'},
          {title: '分类'},
          {title: '最新'},
          {title: '专辑'},
        ],
        current: 0,
      };
    }, methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex;
        }
      },
    },
  };
</script>

<style lang = "scss">
    .home_tab {
        .home_tab_title {
            position: relative;
            /*tab标签*/
            .title_inner {
                width: 60%;
                margin: 0 auto;
            }

            /*放大镜*/
            .iconsearch {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 5%
            }
        }

        .home_tab_content {

        }
    }
</style>
