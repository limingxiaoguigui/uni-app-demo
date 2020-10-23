<template>
    <view>
        <!--用户信息开始-->
        <view class = "user_info">
            <view class = "user_icon">
                <image :src = "imgDetail.user.avatar" mode = "widthFix"></image>
            </view>
            <view class = "user_desc">
                <view class = "user_name">
                    {{imgDetail.user.name}}
                </view>
                <view class = "user_time">
                    {{imgDetail.cntime}}
                </view>
            </view>
        </view>
        <!--用户信息结束-->
        <!--高清大图开始-->
        <view class = "high_img">
            <image mode = "widthFix" :src = "imgDetail.thumb"></image>
        </view>
        <!--高清大图结束-->
        <!--点赞开始-->
        <view class = "user_rank">
            <view class = "rank">
                <text class = "iconfont icondianzan">{{imgDetail.rank}}</text>
            </view>
            <view class = "user_collect">
                <text class = "iconfont iconshoucang">收藏</text>
            </view>
        </view>
        <!--点赞结束-->
        <!--专辑开始-->
        <view class = "album_wrap" v-if="album.length">
            <!--标题-->
            <view class = "album_title">相关</view>
            <!--内容-->
            <view class = "album_list">
                <view class = "album_item" v-for = "item in album" :key = "item.id">
                    <!--左边-->
                    <view class = "album_cover">
                        <image :src = "item.cover" mode = "aspectFill"></image>
                    </view>
                    <!--右边-->
                    <view class = "album_info">
                        <view class = "album_info_text">专辑</view>
                        <view class = "album_name">{{item.name}}</view>
                        <text class = "iconfont iconiconfontjiantou4"></text>
                    </view>
                </view>
            </view>
        </view>
        <!--专辑结束  -->
        <!--最热评论开始·-->
        <view class = "comment hot" v-if="hot.length">
            <view class = "comment_title">
                <text class = "iconfont iconhot1">
                </text>
                <text class = "comment_text">最热评论</text>
            </view>
            <view class = "comment_list">
                <view class = "comment_item" v-for = "item in hot" :key = "item.id">
                    <!--用户信息-->
                    <view class = "comment_user">
                        <!--用户头像-->
                        <view class = "user_icon">
                            <image mode = "widthFix" :src = "item.user.avatar"></image>
                        </view>
                        <!--用户名称-->
                        <view class = "user_name">
                            <view class = "user_nickname">{{item.user.name}}</view>
                            <view class = "user_time">{{item.cntime}}</view>
                        </view>
                        <!--用户徽章-->
                        <view class = "user_badge">
                            <image v-for = "item2 in item.user.title" :key = "item2.icon" :src = "item2.icon"></image>
                        </view>
                    </view>
                    <!--评论数据-->
                    <view class = "comment_desc">
                        <view class = "comment_content">{{item.content}}</view>
                        <view class = "comment_like">
                            <text class = "iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>

            </view>
        </view>
        <!--最热评论结束·-->
        <!--最新评论开始·-->
        <view class = "comment new" v-if="comment.length">
            <view class = "comment_title">
                <text class = "iconfont iconpinglun">
                </text>
                <text class = "comment_text">最新评论</text>
            </view>
            <view class = "comment_list">
                <view class = "comment_item" v-for = "item in comment" :key = "item.id">
                    <!--用户信息-->
                    <view class = "comment_user">
                        <!--用户头像-->
                        <view class = "user_icon">
                            <image mode = "widthFix" :src = "item.user.avatar"></image>
                        </view>
                        <!--用户名称-->
                        <view class = "user_name">
                            <view class = "user_nickname">{{item.user.name}}</view>
                            <view class = "user_time">{{item.cntime}}</view>
                        </view>
                        <!--用户徽章-->
                        <view class = "user_badge">
                            <image v-for = "item2 in item.user.title" :key = "item2.icon" :src = "item2.icon"></image>
                        </view>
                    </view>
                    <!--评论数据-->
                    <view class = "comment_desc">
                        <view class = "comment_content">{{item.content}}</view>
                        <view class = "comment_like">
                            <text class = "iconfont icondianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>

            </view>
        </view>
        <!--最新评论结束·-->
    </view>
</template>

<script>
  import moment from 'moment';

  moment.locale('zh-CN');
  export default {
    data() {
      return {
        //图片信息对象，包含用户头像
        imgDetail: {},
        //专辑数据
        album: [],
        //最热评论
        hot: [],
        //最新品论
        comment: [],

      };
    }, onLoad() {
      const {imgList, imgIndex} = getApp().globalData;
      this.imgDetail = imgList[imgIndex];
      //格式化时间
      this.imgDetail.cntime = moment(this.imgDetail.atime * 1000).fromNow();
      //获取图片详情数据
      this.getComments(this.imgDetail.id);
    },
    methods: {
      getComments(id) {
        this.request({
          url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
        }).then(result => {
          this.album = result.res.album;
          //给hot数组中对象添加一个时间属性xxx月前
          result.res.hot.forEach(v => v.cntime = moment(v.atime * 1000).fromNow());
          result.res.comment.forEach(v => v.cntime = moment(v.atime * 1000).fromNow());
          this.hot = result.res.hot;
          this.comment = result.res.comment;
        });
      },
    },
  };
</script>

<style scoped lang = "scss">
    .user_info {
        display: flex;
        padding: 20 rpx;

        .user_icon {
            padding: 0 20 rpx;
            image: {
                width: 88 rpx;
                border-radius: 50%;
            }
        }

        .user_desc {
            .user_name {

                color: #000;
                font-weight: 600;
            }

            .user_time {
                color: #ccc;
                font-size: 24 rpx;
                padding: 10 rpx 0;
            }
        }
    }

    .user_rank {
        display: flex;
        height: 80 rpx;
        border-bottom: 5 rpx solid #eee;

        .rank {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;

            .iconfont {

            }
        }

        .user_collect {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;

            .iconfont {

            }

        }
    }
    .high_img{
        image{
            border-bottom: 1rpx solid #eee;
        }
    }
    /*专辑*/
    .album_wrap {
        padding: 20 rpx;

        .album_title {
            padding: 10 rpx 0;
        }

        .album_list {
            .album_item {
                display: flex;
                padding: 10 rpx 0;
                border-bottom: 10 rpx solid #eee;

                .album_cover {
                    flex: 1;

                    image {
                        width: 180 rpx;
                        height: 180 rpx;
                    }
                }

                .album_info {
                    flex: 3;
                    padding-left: 20 rpx;
                    position: relative;

                    .album_info_text {
                        width: 100 rpx;
                        height: 50 rpx;
                        background-color: $color;
                        color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .album_name {
                        padding: 10 rpx 0;
                    }

                    .iconfont {
                        font-size: 40 rpx;
                        position: absolute;
                        top: 50%;
                        /*转换*/
                        transform: translateY(-50%);
                        right: 10%;
                        color: #000;
                    }
                }
            }
        }
    }

    /*最热品论*/
    .comment {
        .comment_title {
            padding: 15 rpx;

            .iconfont {
                color: red;
                font-size: 40 rpx;
            }

            .comment_text {
                font-weight: 600;
                font-size: 28 rpx;
                color: #666;
                margin-left: 10 rpx;
            }
        }

        .comment_list {
            .comment_item {
                border-bottom: 15 rpx solid #eee;
                /*用户信息*/
                .comment_user {
                    display: flex;
                    padding: 20 rpx 0;

                    .user_icon {
                        width: 15%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        image: {
                            with: 90%;
                        }
                    }

                    .user_name {
                        flex: 1;

                        .user_nickname {
                            color: #777;
                        }

                        .user_time {
                            color: #ccc;
                            font-size: 24 rpx;
                            padding: 5 rpx;
                        }
                    }

                    .user_badge {
                        image: {
                            width: 40 rpx;
                            height: 40 rpx;
                        }
                    }
                }

                /*评论数据*/
                .comment_desc {
                    display: flex;
                    padding: 30 rpx 0;

                    .comment_content {
                        flex: 1;
                        padding-left: 15%;
                        color: #000;
                    }

                    .comment_like {
                        text-align: right;

                        .icondianzan {

                        }
                    }

                }
            }
        }
    }

    .new {
        .iconpinglun {
            color: aqua !important;
        }
    }
</style>
