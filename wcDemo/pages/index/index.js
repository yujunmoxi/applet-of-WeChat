//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '您好,我亲爱的小程序!',
    userInfo: {}
     
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../aboutme/aboutme'
    // wx.switchTab({
    //   url: '../aboutme/aboutme'
     })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
