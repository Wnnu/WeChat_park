// pages/my/my.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    login:false, //是否已经授权，默认否
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        login: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          login: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            login: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  getUserInfo(userinfo, callback) {
    if (!wx.canIUse('button.open-type.getUserInfo')) { 
       // 向用户提示需要升级微信
      wx.showModal({
        showCancel: false,
        title: '微信版本过旧',
        content: '使用旧版本微信，将无法登陆和使用其他功能，请您更新至最新版本。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.login({})
      if (userinfo.detail.errMsg == 'getUserInfo:ok') {
        // wx.request({}) 
        app.globalData.userInfo = userinfo.detail.userInfo
        this.setData({
          userInfo: userinfo.detail.userInfo,
          login: true
        })
      }
      else if (userinfo.detail.errMsg == 'getUserInfo:fail auth deny') {
        wx.showModal({
          showCancel: false,
          title: '无法完成登录',
          content: '小程序需要获取你的用户资料，用于登陆。请重新登陆,并确保允许小程序获取资料。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        }) // 提示用户，需要授权才能登录
        // callback('fail to modify scope', null)
      }
    }
    
    
  }
})