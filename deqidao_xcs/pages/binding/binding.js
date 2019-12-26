
Page({
  data: {
    imgUrl: [
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png"
    ],//banner图片数据
    current: 0,//当前图片的位置
    isSuccee: false,//绑定成功的开关
    second: 5,//倒计时的秒数
    time: null//声明一个定时器
  },
  //轮播图内容位置改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  //点击绑定按钮绑定成功后的跳转函数
  bindclick() {
    var that = this
    that.setData({
      isSuccee: !this.data.isSuccee
    })
    //判断如果绑定成功了就执行
    if (that.data.isSuccee) {
      that.data.time = setInterval(function () {
        that.setData({
          second: that.data.second - 1
        })
        if (that.data.second < 1) {
          clearInterval(that.data.time)
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }, 1000)
    }

  },
  //取消绑定跳去首页
  cancelBtn(){
   wx.switchTab({
     url: '/pages/index/index',
   })
  },
  //点击返回个人中心
  returnMy() {
    clearInterval(this.data.time)
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  onShow() {

  },
  onLoad(e) {

  },
  onUnload() {


  }
})