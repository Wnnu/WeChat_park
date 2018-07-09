// pages/parkcoupon/parkcoupon.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: true,//是否有优惠券，默认无
    coupon_info: "",//优惠券信息，默认无
    tar: "1",//顶部tar的标识
    ok_coupon: [
      {
        name: "停车券",
        desc: "停车满2小时可用",
        date: "2019.07.30-2018.09.30",
      }, {
        name: "日照万象汇",
        desc: "停车满2小时可用",
        date: "2019.07.30-2018.09.30",
      }, {
        name: "日照万象汇",
        desc: "停车满2小时可用",
        date: "2019.07.30-2018.09.30",
      }, {
        name: "日照万象汇",
        desc: "停车满2小时可用",
        date: "2019.07.30-2018.09.30",
      }],//未使用优惠券信息
    use_coupon: [{
      name: "日照万象汇",
      desc: "停车满2小时可用",
      date: "2019.07.30-2018.09.30",
    }],//已使用优惠券信息
    overdue_coupon: [],//已使用优惠券信息
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
    // 切换未使用，查询数据
    var that=this;
    this.setData({
      tar: "1",
    })

    wx.showLoading({
      title: '正在加载中',
      mask: true,
    })
    wx.request({
      url: app.globalData.host + '/wxinfo/listBindCar',
      header: {
        'content-type': 'application/json',
        'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
      },
      success: function (res) {
        console.log(res)
        if ((parseInt(res.statusCode) === 200) && res.data.code === 1001) {
          that.setData({
            ok_coupon: res.data.data.list
          })
          wx.hideLoading()
        } else {
          wx.hideLoading()
          wx.showModal({
            title: "获取信息出错",
            content: "" + res.data.msg,
            confirmColor: "#4fafc9",
            confirmText: "我知道了",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showModal({
          title: "获取信息出错",
          content: "请求超时或出现了其它未知错误，请您重新尝试",
          confirmColor: "#4fafc9",
          confirmText: "我知道了",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
      }
    })
  },
  tar2: function () {
    // 切换使用记录，查询数据
    this.setData({
      tar: "2",
    })
  },
  tar3: function () {
     // 切换已过期，查询数据
    this.setData({
      tar: "3",
    })
  },
})