<template>
    <scroll-view class="album_scroll_view" scroll-y @scrolltolower="handleToLower">
        <!--swiper标签用于轮播图
        1.自动轮播 autoplay
        2.指示器 indicator-dots
        3.衔接轮播 circular
        4.swiper默认高度150px
        5.image 默认高度240px
        6.计算图片的宽度和高度的比例
        7.把图片的比例也写到swiper-->
        <!--轮播开始-->
        <view class = "album_swiper">
            <swiper autolay indicator-dots circular>
                <swiper-item v-for = "item in banner" :key = "item.id">
                    <image :src = "item.thumb">
                </swiper-item>
            </swiper>
        </view>
        <!--轮播结束-->
        <!--列表开始-->
        <view class = "album_list">
            <navigator class = "album_item" v-for = "item in album" :key = "item.id"
                       :url = "`/pages/album/index?id=${item.id}`">

                <view class = "album_img">
                    <!--等比例拉升并填充满box-->
                    <image model = "aspectFill"
                           :src = "item.cover"></image>
                </view>
                <view class="album_info">
                    <view class="album_name">{{item.name}}</view>
                    <view class="album_desc">{{item.desc}}</view>
                    <view class="album_btn">
                        <view class="album_attention">
                               关注
                        </view>
                    </view>
                </view>
            </navigator>
        </view>
        <!--列表结束-->
    </scroll-view>

</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        params: {
          limit: 30,
          order: 'new',
          skip: 0,
        },
        //轮播数组
        banner: [],
        //列表数组
        album: [],
        //是否有分页数据
        hasMore:true,
      };
    },
    mounted() {
      //修改页面的标题
      uni.setNavigationBarTitle(
          {title: '专辑'},
      );
      this.getList();
    },
    methods: {
      getList() {
        this.request({
          url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
          data: this.params,
        }).then(result => {
          if(this.banner.length===0) {
            this.banner = result.res.banner;
          }
          if(result.res.album.length===0){
            this.hasMore = false;
            uni.showToast({
              title: '没有更多数据了',
              icon: 'none',
            });
            return;
          }
          this.album = [...this.album,...result.res.album];
        });
      },
      //上拉加载更多
      handleToLower: function() {
        if (this.hasMore) {
          this.params.skip += this.params.limit;
          this.getList();
        } else {
          uni.showToast({
            title: '没有数据了',
            icon: 'none',
          });
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
.album_scroll_view {
  height: calc(100vh - 36px);
}
.album_swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #ccc;
    .album_img {
      flex: 1;
      padding: 10rpx;
      image {
        width: 260rpx;
        height: 180rpx;
      }
    }

    .album_info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .album_name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }

      .album_desc {
        padding: 10rpx 0;
        font-size: 24rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        padding-top: 30rpx;
        .album_attention {
          font-size: 24rpx;
          color: $color;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
