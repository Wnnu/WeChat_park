// pages/bindplatenumber/bindplatenumber.js
//获取应用实例
const app = getApp()
var e = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码', //倒计时 
    disabled: true,//获取验证码按钮属性
    disabled2: true,//确认绑定按钮属性
    currentTime: 60,
  
    // 虚拟键盘属性
    keyboard: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyboard: this.selectComponent("#keyboardComponent"),
    })
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
  // 表单提交
  formSubmit: function (e) {
    var that = this;
    // 获取输入的车牌号
    var t = this.data.keyboard.getLpn();
    if (t.length < 6){
      wx.showModal({
        title: "车牌不正确",
        content: "请输入正确的车牌号",
        confirmColor: "#4fafc9",
        confirmText: "我知道了",
        showCancel: false,
      })
    }else{
      wx.showLoading({
        title: '正在绑定中',
        mask: true,
      })
      //向服务器发出绑定请求
      wx.request({
        url: app.globalData.host + '/wxinfo/bindCarnumber',
        data: {
          carnumber: t,
        },
        header: {
          'content-type': 'application/json',
          'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          if ((parseInt(res.statusCode) === 200) && res.data.code === 1001) {
            wx.navigateTo({
              url: "/pages/w_my_bind_prompt/w_my_bind_prompt"
            })
          } else {
            wx.hideLoading()
            wx.showModal({
              title: "绑定失败",
              content: "" + res.data.msg,
              confirmColor: "#4fafc9",
              confirmText: "我知道了",
              showCancel: false,
            })
          }
        },
        fail: function (res) {
          wx.hideLoading()
          console.log(res)
          wx.showModal({
            title: "绑定失败",
            content: "请求超时或出现了其它未知错误，请您重新尝试",
            confirmColor: "#4fafc9",
            confirmText: "我知道了",
            showCancel: false,
          })
        }
      })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  tapindex: function (e) {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },

  // 虚拟键盘
  keyboard1StatusHandler: function (e) {
    this.data.keyboard.getLpn();
  },

})