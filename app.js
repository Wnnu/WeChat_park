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
          if (res.code) {
            wx.request({
              url: this.globalData.host + '/intapplet',
              data: {
                jscode: res.code
              },
              header: {
                'content-type': 'application/json',
                'Cookie': 'NWRZPARKINGID=' + this.globalData.loginMess
              },
              success: function (res) {
                 console.log(res)
                if (res.data.code == 1001 || res.data.code == 1002) {
                  that.globalData.loginMess = res.data.data.sessionid;
                  for (var i = 0; i < res.data.data.history.length; i++) {
                    var str = res.data.data.history[i];
                    var str2 = str.substring(0, 2) + "·" + str.substring(2);
                    res.data.data.history[i] = str2;
                    that.globalData.history = res.data.data.history;
                  }
                 
                  //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.memberReadyCallback) {
                    that.memberReadyCallback(res);
                  }
                } else if (res.data.code == 1004){
                  that.globalData.loginMess = res.data.data.sessionid;
                  that.globalData.member = true;
                  that.globalData.member_tel = res.data.data.vip.vipaccount;
                  that.globalData.member_dengji = res.data.data.vip.levelname;
                  that.globalData.member_jifen = res.data.data.vip.vippoint;
                  for (var i = 0; i < res.data.data.history.length; i++) {
                    var str = res.data.data.history[i];
                    var str2 = str.substring(0, 2) + "·" + str.substring(2);
                    res.data.data.history[i] = str2;
                    that.globalData.history = res.data.data.history;
                  }

                  //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.memberReadyCallback) {
                    that.memberReadyCallback(res);
                  }
                }else{
                  wx.reLaunch({
                    url: '/pages/index_fail/index_fail'
                  })
                }
              },
              fail: function (e) {
                // wx.reLaunch({
                //   url: '/pages/index_fail/index_fail'
                // })
              },
            });
          } else {
            console.log('登录失败！' + res.errMsg)
            wx.reLaunch({
              url: '/pages/index_fail/index_fail'
            })
          }
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
    member: true,            //是否是会员
    member_tel: "",           //会员手机号,默认无
    member_dengji: "",        //会员等级，默认无
    member_jifen: 0,        //会员积分，默认0
    history: null,        //历史记录，最多两位
    loginMess: '',            //session，问刘哥
    // host: 'https://www.jnnewway.com/swsy/'
    // host: 'http://192.168.0.116',
    host: 'http://192.168.0.108',
    // host: 'https://awakall.com',
    // host: 'http://192.168.0.110',
    // host: 'http://192.168.0.105:8080',
  }
})