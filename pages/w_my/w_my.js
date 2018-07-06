// pages/w_my/w_my.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    member: false,//是否是会员
    memberjifen:0,//会员时积分数量
    memberdengji: "",//会员等级，默认无
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    first_jin:true,//是否是首次进入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.member && app.globalData.member == true) {
      this.setData({
        member: app.globalData.member,
        memberdengji: app.globalData.member_dengji,
        memberjifen: app.globalData.member_jifen,
      })
    } else {
      wx.showModal({
        title: "温馨提示",
        content: "您需要绑定会员后才能使用此功能",
        confirmColor: "#4fafc9",
        confirmText: "绑定会员",
        cancelText: "返回首页",
        mask: true,
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/w_my_bind_member/w_my_bind_member"
            })
          } else if (res.cancel) {
            wx.reLaunch({
              url: "/pages/index/index"
            })
          }
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.first_jin = false;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     // 判断是否是首次进入
    if (this.data.first_jin){

    }else{
      this.onLoad();
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
  // 缴费记录
  my_list1: function (e) {
    if(this.data.member!=true){
      this.onLoad();
    }else{
      wx.navigateTo({
        url: "/pages/w_my_payment_record/w_my_payment_record"
      })
    }
  },
  // 我的爱车
  my_list2: function (e) {
    console.log(this.data.member)
    if (this.data.member != true) {
      this.onLoad();
    } else {
      wx.navigateTo({
        url: "/pages/w_my_car/w_my_car"
      })
    }
  },

  // 绑定会员
  // my_list3: function (e) {
  //   wx.navigateTo({
  //     url: "/pages/w_my_bind_member/w_my_bind_member"
  //   })
  // },
  // 停车优惠券
  my_list4: function (e) {
    if (this.data.member != true) {
      this.onLoad();
    } else {
      wx.navigateTo({
        url: "/pages/w_my_park_coupon/w_my_park_coupon"
      })
    }
  },
  // 商户优惠券
  // my_list5: function (e) {
  //   wx.navigateTo({
  //     url: "/pages/w_my_businessman_coupon/w_my_businessman_coupon"
  //   })
  // },
})