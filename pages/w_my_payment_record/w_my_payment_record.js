// pages/w_my_payment_record/w_my_payment_record.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      date: "",//日期     
      payment:[{
        car_number:"苏E·05E67",          //车牌号
        car_money: "6.00",               //支付金额
        payment_area: '日照停车场A2区域', //停车区域
        pay_time: "2018-07-01 09:25:15",          //付款时间
        stop_time:"2小时25分钟11秒",      //停车时长
      }, {
        car_number: "苏E·05E67",          //车牌号
        car_money: "6.00",               //支付金额
        payment_area: '日照停车场A2区域', //停车区域
        pay_time: "2018-07-01 09:25:15",          //付款时间
        stop_time: "2小时25分钟11秒",      //停车时长
        }, {
          car_number: "苏E·05E67",          //车牌号
          car_money: "6.00",               //支付金额
          payment_area: '日照停车场A2区域', //停车区域
          pay_time: "2018-07-01 09:25:15",          //付款时间
          stop_time: "2小时25分钟11秒",      //停车时长
        },],//缴费信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取当前时间戳
    var timestamp = Date.parse(new Date());
    //获取当前时间
    var n = timestamp;
    var date = new Date(n);
    //年
    var Y = date.getFullYear();
    //月
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var time=Y+"-"+M;
    this.setData({
      date: time
    });
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
  // 日期选择
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

})