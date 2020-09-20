//封装请求函数
export default (params) => {
  //显示加载中
  uni.showLoading({
    title: '加载中',
  });
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        //隐藏加载中
        uni.hideLoading();
      },
    });
  });
}
