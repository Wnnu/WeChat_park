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
    circular: true,
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
  }
})
