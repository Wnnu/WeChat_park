//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',  
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,//从data开始的值到此是轮播
    hasUserInfo: true,//是否已授权
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    member:false,//是否是会员
    inputValue: '',//搜索框内的值
    length: 0,//搜索框内的值的长度
    parkinfo:[{
        info:"2000",
        desc:"总车位",
    },{
        info: "暂无",
        desc: "卡级别",
    },{
        info: "0",
        desc: "卡积分",
    }],
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
      length: e.detail.value.length,
    })
  },
  toSearch: function (e) {
    let data;
    let localStorageValue = [];
    var self=this;
    if (this.data.inputValue != '') {
      //调用API从本地缓存中获取数据  
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(this.data.inputValue)
      wx.setStorageSync('searchData', searchData)
      wx.showLoading({
        title: '正在搜索',
        success: function (res) {
          setTimeout(function () {
            wx.showToast({
              title: '未搜索到车辆',
              image: '/images/tishi.png',
              duration: 2000
            })
          }, 2000)
          // wx.request({
          //   url: 'aaa.php',//这里填写后台给你的搜索接口  
          //   method: 'post',
          //   data: { inputValue:self.data.inputValue},
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded'
          //   },
          //   success: function (res) {
          //     if (res.data.length == 0) {
          //       that.setData({
          //         centent_Show: false,
          //       });
          //     }
          //     that.setData({
          //       nanshen_card: res.data,
          //     });
          //   },
          //   fail: function (e) {
          //     wx.showToast({
          //       title: '网络异常！',
          //       duration: 2000
          //     });
          //   },
          // });  
        },
        fail: function (res) {
          wx.showToast({
            title: '搜索失败',
            icon: 'loading',
            duration: 2000
          })
        }
      })
    } else {
      console.log('空白的你搜个蛋！')
    }  
   
  },
  tapRule: function (e) {
    wx.navigateTo({
      url: "/pages/rule/rule"
    })
  },
})
