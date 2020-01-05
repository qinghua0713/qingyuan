import {Request} from '../../utils/request'
Page({
  data: {
    isShow: false,//用来判断是否显示全部内容
    imageUrl: [
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
    ],//轮播图数据列表
    current: 0,//轮播图当前位置
    //order:true,
 
  },
  onLoad(e){
    console.log(e.id)
     Request(`xcx/order/${e.id}`).then(res=>{
       console.log(res.data)
     })
  },

  //点击遮罩隐藏
  hiddenCover(){
   this.setData({
     order:false
   })
  },
  //点击遮罩子盒子显示(事件冒泡真恶心)
  showCover(){
  this.setData({
    order:true
  })
  },
  //点击立即预定按钮事件
  promptlyOrder(){
     this.setData({
       order:true
     })
  },

  //点击X隐藏遮罩
  closeShop(){
    this.setData({
      order:false
    })
  },
  //防止遮罩穿透
  doNotMove(){
    console.log(11)
    return
  },
  //点击显示收货地址模块
  addAddress(){
  wx.navigateTo({ url: '/pages/address/address' });
  },
  //点击编辑显示地址编辑模块
 
  //轮播图改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })
  },

})