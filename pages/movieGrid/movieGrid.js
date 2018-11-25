// pages/movieGrid/movieGrid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    count: 12,
    rows: [],
    isLoading: false
  },
  onScrolltoupper() {
    console.log("onScrolltoupper")
  },
  onScrolltolower() {
    if(this.data.isLoading){
      return
    }
    this.data.isLoading=true;
    wx.showLoading({
      title: "loading",
      mask: true
    })
    this.getMovies()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({
    title,
    url
  }) {
    this.data.url = url;
    wx.setNavigationBarTitle({ //动态修改导航栏标题
      title
    })
    this.init()
  },
  init() {
    this.getMovies();
  },
  getMovies() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.data.url, //仅为示例，并非真实的接口地址
        data: {
          start: this.data.start,
          count: this.data.count
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          resolve(res.data)
        }
      })
    }).then(({
      rows
    }) => {
      wx.hideLoading()//取消loading
      this.setData({
        rows:[...this.data.rows,...rows.map((item) => {
          item.title = item.title.length > 5 ? item.title.substring(0, 5) + "..." : item.title;
          return item
        })],
        start: this.data.start + this.data.count,
        isLoading:false
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data)
  },


})