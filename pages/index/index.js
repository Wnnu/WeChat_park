//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [ 
      '/images/tu1.png',  
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,//从data开始的值到此是轮播
    hasUserInfo: false,//是否已授权
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//判断是否可用
    member:false,//是否是会员
    member_tel: "",//会员手机号,默认无
    member_dengji: "",//会员等级，默认无
    show:"",//卷码扫描值
    history: null,//历史记录值
    showModalStatus: false,//搜索面板显示，默认隐藏
    search_result: null,//搜索结果
    keyboardShow:null,//搜索车牌的值
  },
  onLoad: function (options) {
    var that=this
    this.setData({
      simpleKeyboard: this.selectComponent("#simpleKeyboard"),//获取传值
    })
  // 此处判断是否是会员--https://www.jianshu.com/p/aaf65625fc9d
    if (app.globalData.member) {
      this.setData({
        member: app.globalData.member,
        history: app.globalData.history,
      })
    } else{
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.memberReadyCallback = res => {
        that.shuju();
      }
    } 
    
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
    this.shuju();//每次进入时数据渲染
  },

  // 搜索查询
  toSearch: function (e) {
    this.data.simpleKeyboard.hide()
    var o = this.data.simpleKeyboard.getContent()
    let data;
    let localStorageValue = [];
    var that=this;
    if (o != '' && o.length>=4) {
      //调用API从本地缓存中获取数据  
      // var searchData = wx.getStorageSync('searchData') || []
      // searchData.push(this.data.inputValue)
      // wx.setStorageSync('searchData', searchData)


      wx.request({
        url: app.globalData.host + '/wxpay/getparkingbykeyword',//这里填写后台给你的搜索接口  
        data: { keyword:o},
        header: {
          'content-type': 'application/json',
          'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
        },
        success: function (res) {
          console.log(res)
          if (res.data.code === 1200) {
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
          }else{
            if (res.data.code === 1001) {
              for (var i = 0; i < res.data.data.data.length; i++) {
                var str = res.data.data.data[i].carnumber;
                var str2 = str.substring(0, 2) + "·" + str.substring(2);
                res.data.data.data[i].carnumber = str2;
              }
              that.setData({
                search_result: res.data.data.data,
              });
              that.showModal()
              console.log(that.data.search_result)
            } else {
              wx.showModal({
                title: "搜索提示",
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
          }
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      });  
    } else {
      wx.showModal({
        title: "无法查询",
        content: "查询值不能为空或长度低于4位",
        confirmColor: "#4fafc9",
        confirmText: "我知道了",
        showCancel: false,
      })
    }  
   
  },
  // 缴费规则
  tapRule: function (e) {
    wx.navigateTo({
      url: "/pages/w_index_rule/w_index_rule"
    })
  },
  //绑定会员
  tapBindmember: function (e) {
    this.data.simpleKeyboard.hide()
    wx.navigateTo({
      url: "/pages/w_my_bind_member/w_my_bind_member"
    })
  },
 
  //卷码扫描
  scan: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "--result:" + res.result 
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        //获取成功向后台保存获取的值
      },
      fail: (res) => {
        wx.showModal({
          title: "未获取成功",
          content: "未成功扫描二维码",
          confirmColor: "#4fafc9",
          confirmText: "我知道了",
          showCancel: false,
        })
        // wx.showToast({
        //   title: '未获取成功',
        //   image: '/images/tishi.png',
        //   duration: 2000
        // })
      },
      complete: (res) => {
      }  
    })
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
  //搜索结果跳支付
  search_pay: function (e) {
    var str = e.currentTarget.dataset.text.replace("·", "")
    if (app.globalData.loginMess && app.globalData.loginMess!=""){
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
              wx.navigateTo({
                url: "/pages/w_payment/w_payment?title=" + str
              })
            }
          }
        },
        fail: function (e) {
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        },
      });
    }else{
      wx.showModal({
        title: "提示",
        content: "当前网络延迟，未获取到相关信息，请重新尝试",
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
  //每次进入时数据渲染
  shuju:function(){
    var str2="";
    if (app.globalData.member_tel){
      var str = app.globalData.member_tel;
      str2 = str.substr(0, 3) + "****" + str.substr(7);
    }
    this.setData({
      member: app.globalData.member,
      member_tel: str2,
      member_dengji: app.globalData.member_dengji,
      history: app.globalData.history,
    })
  },
})
