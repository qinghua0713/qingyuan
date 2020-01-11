import { Request } from '../../utils/request'
Page({
  data: {
    showTop: false,
    dataList: null,//轮播图数据
    current: 0,//轮播图当前项
    classifyList: [],//分类每一个藏品的数据列表
    artworkId: null,//艺术品每一类的id
    filtratePirce: {
      lowest: '',
      tallest: ''
    },//筛选输入框的最大小值
    artistId: '',//艺术家的id
    artistIndex: 0,//当前选中的艺术家
    PageUrl: '',//下拉加载更多的请求地址
  },
  //轮播图改变函数
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  onLoad(e) {
    var that = this
    //请求分类页的轮播图
    Request('xcx/category/imgs/').then(res => {
      that.setData({
        dataList: res.data,
        artworkId: e.id
      })
      //判断如果跳转没有传值默认显示第一条
      if (e.value == undefined && e.id == undefined) {
        //请求分类的列表数据
        Request('xcx/category/').then(res => {
          that.setData({
            classifyList: res.data,
            PageUrl: res.data.next,
            value: '分类',
          })
        })
      } else {
        that.setData({
          value: e.value,
        })
        //请求分类的列表数据
        Request('xcx/category/' + e.id).then(res => {
          that.setData({
            classifyList: res.data,
            PageUrl: res.data.next
          })
        })
      }
   
    })



  },
  //滚动条触底函数
  onReachBottom() {
    let that = this
    let results = 'classifyList.results'
    wx.request({
      url: that.data.PageUrl, //开发者服务器接口地址",
      success: res => {
        if (res.data.next == null) {
          wx.showToast({
            title: '已经到底了',
            icon: 'none',
            duration: 2000
          })
        }
        //拼接请求回来的数据
        var results = that.data.classifyList.results.concat(res.data.results)
        that.setData({
          PageUrl: res.data.next,//请求成功从新给更新请求地址
          [results]: results
        })
      },
    });

  },

  //获取筛选输入框的最小值
  getMinValue(e) {
    let lowest = 'filtratePirce.lowest'
    this.setData({
      [lowest]: e.detail.value,
    })
  },
  //获取筛选输入框的最大值
  getMaxValue(e) {
    let tallest = 'filtratePirce.tallest'
    this.setData({
      [tallest]: e.detail.value
    })
  },
  //点击艺术家进行筛选
  artistScreening(e) {
    let that = this
    if (that.data.artistIndex == e.target.dataset.id) {
      that.setData({
        artistIndex: 0
      })
    } else {
      that.setData({
        artistIndex: e.target.dataset.id,
      })
    }
    //请求艺术家的分类
    Request(`xcx/category/`, {
      author: e.currentTarget.dataset.id
    }).then(res => {
      that.setData({
        classifyList: res.data,
        ischecked: !that.data.ischecked
      })
      if (that.data.ischecked) {
        that.setData({
          artistId: e.currentTarget.dataset.id,
        })
      } else {
        that.setData({
          artistId: '',
        })
      }
    })
  },

  //手动输入金额筛选按钮
  filtrateClassify() {
    let that = this
    let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9]$)|(^\d\.[1-9]{1,2}$)|(^\d\.[0]{1}[1-9]{1}$|(^\d\.[1-9]{1}[0]{1}$)$)/;//判断金额合法性
    //如果用户输入的最小值大于最大值那么就交换它们的值再请求
    if (that.data.filtratePirce.lowest != '' && that.data.filtratePirce.tallest != '') {
      if (reg.test(that.data.filtratePirce.lowest) && reg.test(that.data.filtratePirce.tallest)) {
        if (parseFloat(that.data.filtratePirce.lowest) > parseFloat(that.data.filtratePirce.tallest)) {
          let lowest = 'filtratePirce.lowest'
          let tallest = 'filtratePirce.tallest'
          that.setData({
            [lowest]: that.data.filtratePirce.tallest,
            [tallest]: that.data.filtratePirce.lowest
          })
          //搜索艺术家
          Request(`xcx/category/${that.data.artworkId}?author=${that.data.artistId}`, {
            min: that.data.filtratePirce.lowest,
            max: that.data.filtratePirce.tallest
          }).then(res => {
            that.setData({
              classifyList: res.data,
              isShowCover: false,
            })
          })

        } else {
          //否则直接请求
          Request(`xcx/category/${that.data.artworkId}`, {
            min: that.data.filtratePirce.lowest,
            max: that.data.filtratePirce.tallest
          }).then(res => {
            that.setData({
              classifyList: res.data,
              isShowCover: false,

            })
          })
        }
      } else {
        wx.showToast({
          title: '筛选格式错误',
          icon: 'none',
          duration: 2000
        })

      }
    } else {
      wx.showToast({
        title: '筛选金额不能为空',
        icon: 'none',
        duration: 2000
      })
      //可以不用return 但是为了保险起见加上
      return
    }
  },
  //从低到高筛选
  LowToTall() {
    let that = this
    Request(`xcx/category/${that.data.artworkId}`, {
      ordering: 'price'
    }).then(res => {
      that.setData({
        classifyList: res.data
      })
    })
  },
  //从高到低筛选
  TallToLow() {
    let that = this
    Request(`xcx/category/${that.data.artworkId}`, {
      ordering: '-price'
    }).then(res => {
      that.setData({
        classifyList: res.data
      })
    })
  },
  //点击返回首页
  returnHome() {
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  //判断回到顶部按钮是否显示
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
  //点击回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //点击显示类别选项
  optionValue() {
    this.setData({
      showValue: !this.data.showValue
    })
  },
  //选类别中的值
  selectCentre(e) {
    Request(`xcx/category/${e.target.dataset.id}`).then(res => {
      this.setData({
        showValue: false,
        value: e.target.dataset.item,
        classifyList: res.data
      })
    })
  },
  //点击显示筛选盒子
  showCover_one() {
    this.setData({
      isShowCover: true
    })
  },
  //点击隐藏筛选盒子
  hiddenCover() {
    this.setData({
      isShowCover: false
    })
  },
  //点击显示筛选盒子(没办法的办法，不然会触发父盒子的事件)
  showCover_two() {
    this.setData({
      isShowCover: true
    })
  },
  //弹窗防止穿透
  touchHandler() {
    return
  },
  //点击跳转详情页
  goToDateils(e) {
    wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
  },


})