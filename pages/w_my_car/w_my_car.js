// pages/w_my_car/w_my_car.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      cars_number:[],//车牌号，默认无
  //      {
  //   carnumber: "鲁A·123456",
  //   opdate: "2018-07-07 14:45:55"
  // }, {
  //   carnumber: "鲁B·123456",
  //   opdate: "2018-07-07 15:02:31"
  // },
      first_jin: true,//是否是首次进入，默认是
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.showLoading({
      title: '正在玩命加载中',
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
          for (var i = 0; i < res.data.data.list.length;i++){
            var str = res.data.data.list[i].carnumber;
            var str2 = str.substring(0, 2) + "·" + str.substring(2);
            res.data.data.list[i].carnumber=str2;
          }
          that.setData({
            cars_number: res.data.data.list,
            first_jin: false,
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
              wx.reLaunch({
                url: "/pages/index/index"
              })
            }
          }
        })
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
    // 判断是否是首次进入
    if (this.data.first_jin) {

    } else {
      // this.onLoad();
    }
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
              wx.showModal({
                title: "删除出错",
                content: "请求超时或出现了其它未知错误，请您重新尝试",
                confirmColor: "#4fafc9",
                confirmText: "我知道了",
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.onLoad()
                  }
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //点击判断，看是否需要支付，不支付提示
  pay_judge:function(e){
    var str = e.currentTarget.dataset.name.replace("·","")
    wx.showLoading({
      title: '正在加载中',
      mask: true,
    })
    wx.request({
      url: app.globalData.host + '/wxpay/getparkinginfo',//这里填写后台给你的搜索接口  
      data: { carnumber: str },
      header: {
        'content-type': 'application/json',
        'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 1200) {
          wx.hideLoading()
          wx.showModal({
            title: "提示",
            content: "" + res.data.msg,
            confirmColor: "#4fafc9",
            confirmText: "我知道了",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        } else {
          if (res.data.code === 1001) {
            wx.hideLoading()
            wx.showModal({
              title: "提示",
              content: "" + res.data.msg,
              confirmColor: "#4fafc9",
              confirmText: "我知道了",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                }
              }
            })
          } else {
            wx.hideLoading()
            wx.navigateTo({
              url: "/pages/w_payment/w_payment?title=" + str
            })
          }
        }
      },
      fail: function (e) {
        wx.hideLoading()
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  }
})