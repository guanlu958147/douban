//index.js
//获取应用实例
const app = getApp()

Page({
  //事件处理函数
   handleTap:function() {
    wx.switchTab({
      url: "/pages/movie/movie"
    })
    }
  ,
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
   
  }
})
