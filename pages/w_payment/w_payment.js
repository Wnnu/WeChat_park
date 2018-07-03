// pages/payment/payment.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'',//车牌
    pay_memberjifen: 35,//付款时的支付的会员积分
    pay_memberjifen_money: 0.35,//付款时会员积分所减的金额
    member: false,//是否是会员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否会员和获取车牌信息
    this.setData({
      title: options.title,
      member: app.globalData.member
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 判断是否会员
    this.setData({
      member: app.globalData.member
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 判断是否会员
    this.setData({
      member: app.globalData.member
    }) 
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
  // 付款按钮
  payment: function (event) {
    var that = this;
    var oid = event.currentTarget.dataset.oid;
    var parameter;
    if (that.data.cid == '') {
      parameter = { oid: oid }
    } else {
      parameter = { oid: oid, cid: that.data.cid[0].cid }
    }
    wx.request({
      url: app.globalData.host + '/wechat/wx_pay/deliver_pay',
      data: parameter,
      header: {
        'content-type': 'application/json',
        'Cookie': 'NEWWWAY-session-id=' + app.globalData.loginMess
      },
      success: function (res) {
        if (res.data.result) {                   //正常付款
          wx.requestPayment(
            {
              'timeStamp': res.data.Message.timeStamp,//时间戳
              'nonceStr': res.data.Message.nonceStr,//随机字符串，长度为32个字符以下
              'package': res.data.Message.package,//统一下单接口返回的 prepay_id 参数值
              'signType': 'MD5',
              'paySign': res.data.Message.paySign,//签名
              'success': function (res) {
                wx.request({
                  url: app.globalData.host + '/wechat/wx_pay/receive_pay',
                  data: {
                    oid: oid
                  },
                  header: {
                    'content-type': 'application/json',
                    'Cookie': 'NEWWWAY-session-id=' + app.globalData.loginMess
                  },
                  success: function (res) {
                    app.globalData.payShow = 0;
                    app.globalData.cid = '';
                    wx.navigateBack({
                      delta: 10
                    })
                  }
                });
              },
              'fail': function (res) {
                console.log("失败")
                console.log(res)
              },
              'complete': function (res) {
              }
            })
        } else {
          if (res.data.errorcode == "1001") {      //已下架
            var content = "";
            for (var i = 0; i < res.data.data.length; i++) {
              content += res.data.data[i] + "\r\n";
            }
            wx.showModal({
              title: res.data.Messge,
              content: content,
              confirmColor: "#4fafc9",
              confirmText: "我知道了",
              showCancel: false
            })
          } else if (res.data.errorcode == "1002") {  //未登录
            that.setData({
              hiddenmodalput: false
            });
          } else if (res.data.errorcode == "1003") {    //购物券失效
            wx.showModal({
              title: '提示',
              content: res.data.Messge,
              confirmColor: "#4fafc9",
              confirmText: "我知道了",
              showCancel: false,
            })
          } else if (res.data.errorcode == "1004") {  //使用优惠券后结算金额为0
            wx.showModal({
              title: '提示',
              content: res.data.Messge,
              confirmColor: "#4fafc9",
              confirmText: "我知道了",
              showCancel: false,
              success: function (res1) {
                if (res1.confirm) {
                  wx.navigateBack({
                    delta: 10
                  })
                }
              }
            })
          }
          else { }
        }
      }
    })
  },
  //事件处理函数
  /*点击减号*/
  bindMinus: function () {
    var pay_memberjifen = this.data.pay_memberjifen;
    if (pay_memberjifen > 0) {
      pay_memberjifen--;
    }
    var pay_memberjifen_money = pay_memberjifen/100;
    var minusStatus = pay_memberjifen > 0 ? 'normal' : 'disable';
    this.setData({
      pay_memberjifen: pay_memberjifen,
      pay_memberjifen_money: pay_memberjifen_money,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    var pay_memberjifen = this.data.pay_memberjifen;
    pay_memberjifen++;
    var pay_memberjifen_money = pay_memberjifen / 100;
    var minusStatus = pay_memberjifen > 0 ? 'normal' : 'disable';
    this.setData({
      pay_memberjifen: pay_memberjifen,
      pay_memberjifen_money: pay_memberjifen_money,
      minusStatus: minusStatus
    })
  },
})