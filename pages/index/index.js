//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [ '/images/tu1.png',  
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,//从data开始的值到此是轮播
    hasUserInfo: false,//是否已授权
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    member:true,//是否是会员
    inputValue: '',//搜索框内的值
    length: 0,//搜索框内的值的长度
    show:"",//卷码扫描值
    history: [//历史记录值
      "苏E·05E67",
      "苏E·05E689",
    ],
    showModalStatus: false,//搜索面板显示，默认隐藏
    search_result:[//搜索结果
      "苏E 05E67",
      "苏E 05E68",
      "苏E 05E69",
    ],

  },
  onLoad: function (options) {
  // 此处判断是否是会员--https://www.jianshu.com/p/aaf65625fc9d
    // app.employIdCallback = member => {
    //   console.log(data)
    //   if (data != '') {
    //     this.setData({
    //       member: app.globalData.member
    //     })
    //   }
    // }
   
    this.authorize();
    
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    // this.setData({
    //   member: app.globalData.member
    // })
    this.authorize();
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    // this.setData({
    //   member: app.globalData.member
    // })
    this.authorize();
  },
  getUserInfo(userinfo, callback) {
    var that=this;
    if (!wx.canIUse('button.open-type.getUserInfo')) {
      // 向用户提示需要升级微信
      wx.showModal({
        showCancel: false,
        title: '微信版本过旧',
        content: '使用旧版本微信，将无法登陆和使用其他功能，请您更新至最新版本。',
        success: function (res) {
        }
      })
    } else {
      wx.login({})
      if (userinfo.detail.errMsg == 'getUserInfo:ok') {
        // wx.request({}) 
        app.globalData.userInfo = userinfo.detail.userInfo
        that.setData({
          userInfo: userinfo.detail.userInfo,
          hasUserInfo: true
        })
        that.toSearch();
      }
      else if (userinfo.detail.errMsg == 'getUserInfo:fail auth deny') {
        wx.showModal({
          showCancel: false,
          title: '未获得授权',
          content: '小程序需要获取您的授权，才可以进行相关操作。',
          success: function (res) {
          }
        }) // 提示用户，需要授权才能登录
        // callback('fail to modify scope', null)
      }
    }
  },
  // 输入框实时改变值和长度
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
      length: e.detail.value.length,
    })
  },
  // 搜索查询
  toSearch: function (e) {
    let data;
    let localStorageValue = [];
    var self=this;
    if (this.data.inputValue != '') {
      //调用API从本地缓存中获取数据  
      var searchData = wx.getStorageSync('searchData') || []
      searchData.push(this.data.inputValue)
      wx.setStorageSync('searchData', searchData)
      wx.showLoading({
        title: '正在搜索',
        success: function (res) {
          // setTimeout(function () {
          //   wx.showToast({
          //     title: '未搜索到车辆',
          //     image: '/images/tishi.png',
          //     duration: 2000
          //   })
          // }, 2000)
          wx.hideLoading()
          self.showModal();
          // wx.request({
          //   url: 'aaa.php',//这里填写后台给你的搜索接口  
          //   method: 'post',
          //   data: { inputValue:self.data.inputValue},
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded'
          //   },
          //   success: function (res) {
          //     if (res.data.length == 0) {
          //       that.setData({
          //         centent_Show: false,
          //       });
          //     }
          //     that.setData({
          //       nanshen_card: res.data,
          //     });
          //   },
          //   fail: function (e) {
          //     wx.showToast({
          //       title: '网络异常！',
          //       duration: 2000
          //     });
          //   },
          // });  
        },
        fail: function (res) {
          wx.showToast({
            title: '搜索失败',
            icon: 'loading',
            duration: 2000
          })
        }
      })
    } else {
      console.log('空白')
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
    wx.navigateTo({
      url: "/pages/w_my_bind_member/w_my_bind_member"
    })
  },
 
  // 判断是否已经授权
  authorize: function () {
    if (app.globalData.userInfo) {
      this.setData({
        // userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          // userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            // userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    console.log(e.currentTarget.dataset.text)
    wx.navigateTo({
      url: "/pages/w_payment/w_payment?title=" + e.currentTarget.dataset.text
    })
  },
  
})
