// pages/w_my_car/w_my_car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cars_number:[
        {
          number:"苏E·05E68",
          time:"2018-06-26",
        },
        {
          number: "苏E·05E69",
          time: "2018-07-01",
        }],//车牌号，默认无
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
  addPlatenumber:function(){
    wx.navigateTo({
      url: "/pages/w_my_bind_platenumber/w_my_bind_platenumber"
    })
  }
})