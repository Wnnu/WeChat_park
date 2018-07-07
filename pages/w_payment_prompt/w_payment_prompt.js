// pages/w_payment_prompt/w_payment_prompt.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码', //倒计时 
    disabled: true,//获取验证码按钮属性
    disabled2: true,//确认绑定按钮属性
    currentTime: 60,
    platenumber: '',//车牌号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 验证码input
  addPlatenumber: function (e) {
    this.setData({
      platenumber: e.detail.value
    })
  },
  // 表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)


    // wx.request({
    //   url: `${config.api + '/addinfo'}`,
    //   data: {
    //     phoneNum: this.data.phoneNum,
    //     code: this.data.code,
    //     otherInfo: this.data.otherInfo
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res)
    //     if ((parseInt(res.statusCode) === 200) && res.data.message === 'pass') {
    //       wx.showToast({
    //         title: '验证成功',
    //         icon: 'success'
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.message,
    //         image: '../../images/fail.png'
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  tapindex: function (e) {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },
  tapplatenumber: function (e) {
    wx.navigateTo({
      url: "/pages/w_my_bind_platenumber/w_my_bind_platenumber"
    })
  },
})