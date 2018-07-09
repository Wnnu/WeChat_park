// pages/payment/payment.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'',//车牌
    member: false,//是否是会员,默认false
    first_pay: true,//是否是首次登录,默认true
    showHeight: !1,//会员积分模块高度判断
    pay_stop: 0,//停车费，默认0
    pay_member: 0,//会员减免，默认0
    pay_coupon: 0,//优惠券减免，默认0
    pay_memberjifen: 0,//付款时的支付的会员积分
    pay_memberjifen_money: 0,//付款时会员积分所减的金额
    pay_result:0,//实际支付价格，默认0
    first_jin: true,//是否是首次进入,默认是

    showModalStatus: false,//优惠券面板显示，默认隐藏
    // search_result: null,//优惠券结果
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
      }
    ],//优惠券结果
    keyboardShow: null,//优惠券的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否会员和获取车牌信息\
    // wx.showLoading({
    //   title: '正在加载...',
    //   mask: true,
    // })
    var str2="";
    if (options.title && options.title != "" && options.title.indexOf("·") == -1){
      var str = options.title
      str2 = str.substring(0, 2) + "·" + str.substring(2);
    }
    // var pay_result = this.data.pay_result.toFixed(2);
    this.setData({
      title: str2,
      member: app.globalData.member,
    }) 
    // 请求查询需要缴费多少
    // wx.request({
    //   url: app.globalData.host + '/wxinfo/listBindCar',
    //   data:{
    //     carnumber: options.title,
    //   },
    //   header: {
    //     'content-type': 'application/json',
    //     'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     if ((parseInt(res.statusCode) === 200) && res.data.code === 1001) {
    //       that.setData({
    //         cars_number: res.data.data.list,
    //         first_jin: false,
    //       })
    //       wx.hideLoading()
    //     } else {
    //       wx.hideLoading()
    //       wx.showModal({
    //         title: "获取信息出错",
    //         content: "" + res.data.msg,
    //         confirmColor: "#4fafc9",
    //         confirmText: "我知道了",
    //         showCancel: false,
    //         success: function (res) {
    //           if (res.confirm) {
    //             wx.reLaunch({
    //               url: "/pages/index/index"
    //             })
    //           }
    //         }
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     wx.hideLoading()
    //     console.log(res)
    //     wx.showModal({
    //       title: "获取信息出错",
    //       content: "请求超时或出现了其它未知错误，请您重新尝试",
    //       confirmColor: "#4fafc9",
    //       confirmText: "我知道了",
    //       showCancel: false,
    //       success: function (res) {
    //         if (res.confirm) {
    //           wx.reLaunch({
    //             url: "/pages/index/index"
    //           })
    //         }
    //       }
    //     })
    //   }
    // })


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
  //查看照片
  photo:function(){

  },
  coupon:function(){
    this.showModal();
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //关闭隐藏对话框
  close_coupon:function(){
    this.hideModal();
  },
  //缴费规则
  tapRule:function(){
    wx.navigateTo({
      url: "/pages/w_index_rule/w_index_rule"
    })  
  }
})