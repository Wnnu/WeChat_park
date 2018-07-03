//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    var that=this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // if (res.code) {
          //   wx.request({
          //     url: this.globalData.host + '/intapplet',
          //     data: {
          //       jscode: res.code
          //     },
          //     header: {
          //       'content-type': 'application/json',
          //       'Cookie': 'NWRZPARKINGID=' + this.globalData.loginMess
          //     },
          //     success: function (res) {
          //        console.log(res)
          //       if (res.data.code == 1001 || res.data.code == 1002) {
          //         that.globalData.loginMess = res.data.data.sessionid;
          //         //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
          //         // 所以此处加入 callback 以防止这种情况
          //         if (this.employIdCallback) {
          //           this.employIdCallback(res);
          //         }
          //       } else if (res.data.code == 1004){
          //         that.globalData.loginMess = res.data.data.sessionid;
          //         that.globalData.member = true;
          //         //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
          //         // 所以此处加入 callback 以防止这种情况
          //         if (this.employIdCallback) {
          //           this.employIdCallback(res);
          //         }
          //       }else{
          //         wx.showToast({
          //           title: '' + res.data.message,
          //         })
          //       }
          //     }
          //   });
          // } else {
          //   console.log('登录失败！' + res.errMsg)
          // }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
 
  },
  globalData: {
    userInfo: null,           //用户信息，判断用户授没授权
    member: false,            //是否是会员
    loginMess: '',            //session，问刘哥
    // host: 'https://www.jnnewway.com/swsy/'
    // host: 'http://192.168.0.116',
    host: 'http://192.168.0.108:8080',
    // host: 'https://awakall.com',
    // host: 'http://192.168.0.110',
    // host: 'http://192.168.0.105:8080',
  }
})