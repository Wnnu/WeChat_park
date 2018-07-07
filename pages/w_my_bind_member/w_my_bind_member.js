// pages/bindmember/bindmember.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码', //倒计时 
    disabled:true,//获取验证码按钮属性
    disabled2: true,//确认绑定按钮属性
    currentTime: 60,
    phoneNum: '',//手机号
    code: '',//验证码 
    phoneNum_true:false,//判断手机号输入框是否可输入

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
    // wx.reLaunch({
    //   url: "/pages/index/index"
    // })
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
  // 验证码倒计时
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    var interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒',
        phoneNum_true:true
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新获取',
          currentTime: 60,
          disabled: false,
          phoneNum_true: false
        })
      }
    }, 1000)
  },

  //手机号input
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum){
        this.setData({
          disabled: false,
          phoneNum: phoneNum
        })
        this.activeButton()
      }
      
    } else {
      this.setData({
        phoneNum: '',
        disabled: true,
      })
      this.activeButton()
    }
  },
  //验证手机号格式
  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '/images/tishi.png',
      })
      return false
    }
  },
  // 验证码input
  addCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
  },
  // 验证码按钮
  sendMsg: function (phoneNum) {
    
    var that = this
    
    wx.request({
      url: app.globalData.host + '/wxinfo/sendBindSMSText',
      data: {
        phone: that.data.phoneNum
      },
      header: {
        'content-type': 'application/json',
        'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==1001){
          wx.showToast({
            title: "验证码已发送，60秒后可重新获取",
            icon: 'success',
            duration: 1500,
          })
          var currentTime = that.data.currentTime
          that.setData({
            time: currentTime + '秒',
            disabled: true,
            // code:"123456",
          })
          that.getCode();
        }else{
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
        }
      }
    })  
  },
  // 确认按钮
  activeButton: function () {
    let { phoneNum, code } = this.data
    if (phoneNum && phoneNum.length === 11 && code ) {
      this.setData({
        disabled2: false,
      })
    } else {
      this.setData({
        disabled2: true,
      })
    }
  },
  // 表单提交
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    wx.showLoading({
      title: '正在绑定中',
      mask: true,
    })
    wx.request({
      url: app.globalData.host + '/wxinfo/authBindSMSText',
      data: {
        phone: e.detail.value.tel,
        verification: e.detail.value.identifying_code,
      },
      header: {
         'content-type': 'application/json',
         'Cookie': 'NWRZPARKINGID=' + app.globalData.loginMess
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if ((parseInt(res.statusCode) === 200) && res.data.code === 1001) {
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            success:function(res){
              app.globalData.member=true;
              setTimeout(function () { 
                wx.navigateTo({
                  url: "/pages/w_my_bind_platenumber/w_my_bind_platenumber",
                })
              },1500) 
             
            }
          })
        } else {
          wx.showModal({
            title: "绑定失败",
            content: ""+res.data.msg,
            confirmColor: "#4fafc9",
            confirmText: "我知道了",
            showCancel: false,
          })
        }
      },
      fail: function (res) {
        wx.hideLoading()
        console.log(res)
        wx.showModal({
          title: "绑定失败",
          content: "请求超时或出现了其它未知错误，请您重新尝试",
          confirmColor: "#4fafc9",
          confirmText: "我知道了",
          showCancel: false,
        })
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
})