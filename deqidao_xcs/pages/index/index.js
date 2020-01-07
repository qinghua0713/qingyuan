//index.js
//获取应用实例
const app = getApp()
import {
  Request
} from "../../utils/request";
Page({
  data: {
    showTop: false, //判断返回按钮是否显示
    isPlay: false, //用来判断是否显示播放按钮
    swiperIndex: 2, //swiper当前下标
    dataList:null, //请求回来的数据列表
    swiper_noe_current:0,//第一个轮播图的当前下标
    isShowCearchCover:true
  },
  //搜索框获取焦点
  searchFocus(){
     this.setData({
       isShowCearchCover:true//显示搜索框的遮罩
     })
  },
  hideSearchCover(){
   this.setData({
     isShowCearchCover:false
   })
  },
  //手机键盘输入实时请求数据
  searchShop(e){
    console.log(e)
    wx.request({
      url:app.globalData.BaseUrl+ `goods/search/?search=${e.detail.value}`, //开发者服务器接口地址",
      success: res => {
        console.log(res)
      },
    });
  },
  // 加载小程序的时候会触发这个 onLoad方法
  onLoad: function () {
    var that = this;
    Request('xcx/page/index/').then(res=>{
      that.setData({
        dataList:res.data
      })
      console.log(res.data)

    })
  },
  

//点击跳转艺术家详情
goToArtDetails(){
  wx.navigateTo({
    url: '/pages/artistDateils/artistDateils',
  })
},
  // 判断返回按钮是否显示
  onPageScroll(e) {
    if (e.scrollTop > 1000) {
      this.setData({
        showTop: true
      })
    } else {
      this.setData({
        showTop: false
      })
    }
  },
  //点击跳转详情
  goToClassify(e) {
    var value = decodeURIComponent(e.currentTarget.dataset.value);
    wx.navigateTo({
      url: `/pages/classify/classify?id=${e.currentTarget.dataset.id}&value=${value}`,
    })
  },
  //点击跳转tunnel页面
  goToTunnel() {
    wx.switchTab({
      url: '/pages/tunnel/tunnel'
    });
  },
  // 点击回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //点击跳转艺术家详情页
  goToArtistDateils() {
    wx.navigateTo({
      url: '/pages/artistDateils/artistDateils'
    });
  },
  //点击跳转艺术品详情
  goToDetails(e){
      wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
  },
    //轮播图内容位置改变触发
    swiperChange_one(e) {
      var that = this;
      that.setData({
        swiper_noe_current: e.detail.current,
      })
  
    },
  // 轮播图改变触发
  swiperChange_two(e) {
    const that = this;
    var current = e.detail.current + 2
    if (e.detail.current == this.data.dataList.authors.length - 1) {
      current = 1
    }
    if (current > this.data.dataList.authors.length - 1) {
      current = 0
    }
    that.setData({
      swiperIndex: current,
    })
  },
  // 点击播放，隐藏播放按钮与视频封面
  videoPlay() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    var videoplay = wx.createVideoContext("myVideo")
    videoplay.play()
  },

})