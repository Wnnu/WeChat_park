// pages/businessman_coupon/businessman_coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      coupon:true,//是否有优惠券，默认无
      coupon_info: "",//优惠券信息，默认无
      tar:"1",//顶部tar的标识
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
  // 顶部tar切换
  tar1: function () {
    this.setData({
      tar: "1",
    })
  },
  tar2: function () {
    this.setData({
      tar: "2",
    })
  },
  tar3: function () {
    this.setData({
      tar: "3",
    })
  },
})