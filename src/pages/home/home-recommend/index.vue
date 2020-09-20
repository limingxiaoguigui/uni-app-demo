<template>
    <!--滚动条组件-->
    <scroll-view @scrolltolower="handleToLower" class="recommend_view" scroll-y v-if="recommends.length>0" >
        <!-- 首页推荐开始-->
        <view class = "recommend_wrap">
            <view class = "recommend_item"
                  v-for = "item in recommends" :key = "item.id"
            >
                <!--图片自适应-->
                <image mode = "widthFix" :src = "item.thumb"></image>
            </view>
        </view>
        <!-- 首页推荐结束-->
        <!--月份开始-->
        <view class = "monthes_wrap">
            <view class = "monthes_title">
                <view class = "monthes_title_info">
                    <view class = "monthes_info">
                        <text>{{monthes.DD}} / </text>
                        {{monthes.MM}} 月
                    </view>
                    <view class = "monthes_text">{{monthes.title}}</view>
                </view>
                <view class = "monthes_title_more">更多 ></view>
            </view>
            <view class = "monthes_content">
                <view class="monthes_item"
                v-for="item in monthes.items" :key="item.id">
                    <!--图片填充类型-->
                    <image  mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
                </view>
            </view>
        </view>
        <!--月份结束-->
        <!--热门开始-->
         <view class="hots_wrap">
      <view class="hots_title">
        <text> 热门 </text>
      </view>
      <view class="hots_content">
        <view class="hots_item"
              v-for="item in hots"
              :key="item.id">
            <image mode = 'widthFix'
                   :src = "item.thumb">
            </image>
        </view>
      </view>
    </view>
        <!--热门结束-->
    </scroll-view>
</template>

<script>
    import moment from "moment";
  export default {
    name: 'index',
    data() {
      return {
        //推荐列表
        recommends: [],
        //月份
        monthes: {},
        //热门
        hots: [],
        //请求参数
        params: {
          //要获取几条
          limit: 30,
          //关键字
          order: 'hot',
          //要跳过几条
          skip: 0,
        },
        //是否还有下一页
        hasMore: true,
      };
    },
    mounted() {
        this.getList();
    },
    methods:{
      //获取列表数据
      getList() {
        this.request({
          url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
          data: this.params,
        }).then(result => {
          //是否还有下一页
          if (result.res.vertical.length === 0) {
            this.hasMore = false;
            return;
          }
          if (this.recommends.length === 0) {
            //推荐
            this.recommends = result.res.homepage[1].items;
            //月份
            this.monthes = result.res.homepage[2];
            //处理时间格式
            this.monthes.MM = moment(this.monthes.stime).format('MM');
            this.monthes.DD = moment(this.monthes.stime).format('DD');
          }
          //热门
          //数组拼接
          this.hots = [...this.hots, ...result.res.vertical];
        });
      },
      //滚动条触底事件
      handleToLower() {
        /*1.修改参数
        * 2.重新发送请求getList
        * 3.请求成功hots数据叠加
        **/
        if (this.hasMore) {
          this.params.skip += this.params.limit;
          this.getList();
        } else {
          uni.showToast({
            title: '没有数据了',
            icon: 'none',
          });
        }
      },
    }
  };
</script>

<style lang = "scss" scoped>
    .recommend_view{
        /*height:屏幕的高度 - 头部的高度*/
        height: calc(100vh - 36px);
    }
    /*推荐样式*/
    .recommend_wrap {
        /*flex布局*/
        display: flex;
        flex-wrap: wrap;

        .recommend_item {
            width: 50%;
            border: 5rpx solid #fff;
        }
    }

    /*月份样式*/
    .monthes_wrap {
        .monthes_title {
            display: flex;
            justify-content: space-between;
            padding: 20rpx;
            .monthes_title_info {
                color: $color;
                font-size: 30rpx;
                font-weight: 600;
                display: flex;
                .monthes_info {
                    text {
                        font-size: 36rpx;
                    }
                }
                .monthes_text {
                    font-size: 34rpx;
                    color: #666;
                    margin-left: 30rpx;
                }
            }

            .monthes_title_more {
                font-size: 24rpx;
                color: $color;
            }
        }
        .monthes_content {
            display: flex;
            flex-wrap: wrap;
            .monthes_item {
                width: 33.33%;
                border: 5rpx solid #fff;
            }
        }
    }
    /*热门样式*/
    .hots_wrap {
      .hots_title {
        padding: 20rpx;
        text {
          border-left: 20rpx solid $color;
          padding-left: 20rpx;
          font-size: 34rpx;
          font-weight: 600;
        }
      }
      .hots_content {
        display: flex;
        flex-wrap: wrap;
        .hots_item {
          width: 33.33%;
          border: 5rpx solid #fff;
        }
      }
    }
</style>
