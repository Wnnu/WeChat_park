// pages/bindplatenumber/bindplatenumber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码', //倒计时 
    disabled: true,//获取验证码按钮属性
    disabled2: true,//确认绑定按钮属性
    currentTime: 60,
    platenumber: '',//车牌号
    

    isKeyboard: false, //是否显示键盘
    specialBtn: false,
    tapNum: false, //数字键盘是否可以点击
    parkingData: false, //是否展示剩余车位按钮
    isFocus: false, //输入框聚焦
    flag: false, //防止多次点击的阀门
    keyboardAlph: 'QWERTYUIOPASDFGHJKL巛ZXCVBNM',
    keyboardNumber: '1234567890',
    keyboard1:
    '京津沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝',
    keyboard2: '',
    keyboard2For: ['完成'],
    keyboardValue: '',
    textArr: [],
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
    var self = this;
    //将keyboard1和keyboard2中的所有字符串拆分成一个一个字组成的数组
    self.data.keyboard1 = self.data.keyboard1.split('');
    self.data.keyboard2 = self.data.keyboard2.split('');
    self.setData({
      keyboardValue: self.data.keyboard1
    });
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
  // 车牌值
  addPlatenumber: function (e) {
    this.setData({
      platenumber: e.detail.value
    })
  },
  // 表单提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.navigateTo({
      url: "/pages/w_my_bind_prompt/w_my_bind_prompt"
    })
    // wx.showToast({
    //   title: '绑定成功',
    //   icon: 'success',
    // })
   
    // wx.request({
    //   url: `${config.api + '/addinfo'}`,
    //   data: {
    //     phoneNum: this.data.phoneNum,
    //     code: this.data.code,
    //     otherInfo: this.data.otherInfo
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res)
    //     if ((parseInt(res.statusCode) === 200) && res.data.message === 'pass') {
    //       wx.showToast({
    //         title: '验证成功',
    //         icon: 'success'
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.data.message,
    //         image: '../../images/fail.png'
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  tapindex: function (e) {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },



  
  /**
   * 点击页面隐藏键盘事件
   */
  hideKeyboard: function () {
    var self = this;
    if (self.data.isKeyboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      if (self.data.platenumber) {
        self.setData({
          isKeyboard: false
        });
      } else {
        self.setData({
          isKeyboard: false,
          isFocus: false
        });
      }
    }
  },
  /**
   * 输入框聚焦触发，显示键盘
   */
  bindFocus: function () {
    var self = this;
    if (self.data.isKeyboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      self.setData({
        isKeyboard: false,
        isFocus: true
      });
    } else {
      //说明键盘是隐藏的，再次点击显示键盘
      self.setData({
        isFocus: true,
        isKeyboard: true
      });
    }
  },
  // bindBlur: function () {
  //   this.setData({
  //     isKeyboard: false,
  //     isFocus: false
  //   });
    
  // },

  /**
   * 键盘事件
   */
  tapKeyboard: function (e) {
    var self = this;
    //获取键盘点击的内容，并将内容赋值到textarea框中
    var tapIndex = e.target.dataset.index;
    var tapVal = e.target.dataset.val;
    var keyboardValue;
    var specialBtn;//判断字母数字显示
    var tapNum;//判断数字显示
    if (tapVal == '巛') {
      //说明是删除
      self.data.textArr.pop();
      if (self.data.textArr.length == 0) {
        //说明没有数据了，返回到省份选择键盘
        this.specialBtn = false;
        this.tapNum = false;
        this.keyboardValue = self.data.keyboard1;
      } else if (self.data.textArr.length == 1) {
        //只能输入字母
        this.tapNum = false;
        this.specialBtn = true;
        this.keyboardValue = self.data.keyboard2;
      } else {
        this.specialBtn = true;
        this.tapNum = true;
        this.keyboardValue = self.data.keyboard2;
      }
      self.data.platenumber = self.data.textArr.join('');
      self.setData({
        platenumber: self.data.platenumber,
        keyboardValue: this.keyboardValue,
        specialBtn: this.specialBtn,
        tapNum: this.tapNum
      });
      return false;
    }
    if (self.data.textArr.length >= 7) {
      return false;
    }
    self.data.textArr.push(tapVal);
    self.data.platenumber = self.data.textArr.join('');
    self.setData({
      platenumber: self.data.platenumber,
      keyboardValue: self.data.keyboard2,
      specialBtn: true
    });
    if (self.data.textArr.length > 1) {
      //展示数字键盘
      self.setData({
        tapNum: true
      });
    }
  },
  /**
   * 特殊键盘事件（删除和完成）
   */
  tapSpecBtn: function (e) {
    var self = this;
    var btnIndex = e.target.dataset.index;
    if (btnIndex == 0) {
      //说明是完成事件
      if (self.data.textArr.length < 7) {
        wx.showToast({
          title: '请输入正确的车牌号',
          icon: 'success',
          mask: true,
          image: '../../images/icon_error.png',
          duration: 2000
        });
      } else {
        if (!checkNetWork.checkNetWorkStatu()) {
          console.log('网络错误');
        } else {
          wx.showLoading({
            title: '提交中',
            mask: true
          });
          wx.request({
            url:
            '',
            method: 'post',
            data: {
              plateNo: self.data.platenumber
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              wx.hideLoading();
              var response = res.data.data;
              if (res.data.errorCode == 0) {
                //说明请求成功了,跳转到支付页面
                wx.navigateTo({
                  url:
                  '../payment/payment?plateNo=' +
                  response.plateNo +
                  '&cost=' +
                  response.cost +
                  '&phoneNumber=' +
                  self.data.phoneNumber
                });
              } else if (res.data.errorCode == 1) {
                //说明不用支付
                var msg = res.data.title;
                wx.showModal({
                  title: msg,
                  content: res.data.errorMessage,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                    }
                  }
                });
              }
            },
            complete: function () {
              wx.hideLoading();
            }
          });
        }
      }
    }
  },
  tap_area: function (e) {
    
  }
})