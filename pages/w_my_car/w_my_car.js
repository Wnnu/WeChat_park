// pages/w_my_car/w_my_car.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      cars_number:[],//车牌号，默认无
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that=this;
    wx.request({
      url: app.globalData.host + '/wxinfo/listBindCar',
      header: {
        'content-type': 'application/json',
        'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
      },
      success: function (res) {
        if ((parseInt(res.statusCode) === 200) && res.data.code === 1001) {
          that.setData({
            cars_number: res.data.data.list
          })
          wx.hideLoading()
        } else {
          wx.showModal({
            title: "获取信息出错",
            content: "" + res.data.msg,
            confirmColor: "#4fafc9",
            confirmText: "我知道了",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: -1
                });
              } 
            }
          })
        }
      },
      fail: function (res) {
        console.log(res)
        
      }
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
  addPlatenumber:function(){
    wx.navigateTo({
      url: "/pages/w_my_bind_platenumber/w_my_bind_platenumber"
    })
  },
  //删除车牌
  delate: function (e) {
    var that=this;
    console.log(e)
    var vcid = e.currentTarget.dataset.vcid;
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.host + '/wxinfo/unBindCarnumber',
            data:{
              vcid: vcid,
            },
            header: {
              'content-type': 'application/json',
              'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
            },
            success: function (res) {
              console.log(res)
              if ((parseInt(res.statusCode) === 200) && res.data.code === 1001) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                that.onLoad()
              } else {
                wx.showModal({
                  title: "删除出错",
                  content: "" + res.data.msg,
                  confirmColor: "#4fafc9",
                  confirmText: "我知道了",
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                    }
                  }
                })
              }
            },
            fail: function (res) {
              console.log(res)

            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})