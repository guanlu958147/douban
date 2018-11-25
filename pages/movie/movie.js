// pages/movie/movie.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "../../images/39114a8f04634d2cbd9888f2869b5e8120170125085034.jpeg",
      "../../images/889cf46b056d48d9be848d4aa3166cfa20170206090116.jpeg",
      "../../images/9ea02e470af84cd1af74e469facbd96d20170205115136.png"
    ],
    hotMovies:{
      url:'http://localhost:3000/movies/hot',
      title:"正在上映",
      start:0,
      count:6,
      rows:[]
    },
    comingMovies:{
      url:'http://localhost:3000/movies/coming',
      title:"即将上映",
      start:0,
      count:8,
      rows:[]
    },
    isObservious:false,//控制重置按钮
    isSearch:false,//搜索时控制“movie-grid组件”和“movie-list组件”
    searchValue:"",//接收搜索框的值
    searchResultMovies:{//搜索时初始化数据
      start:0,
      count:12,
      rows:[],
      title:""
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  onTapMore({detail:{title,url}}){//点击更多跳转movieGrid页面
    wx.navigateTo({
      url: `/pages/movieGrid/movieGrid?title=${title}&url=${url}`,
    })
  },
  handleMovieInfo({detail:{movie}}){//点击图片跳转details
    let str=JSON.stringify(movie)
    wx.navigateTo({
      url: `/pages/details/details?movie=${str}`,
    })
  },
  onFocus(event){//搜索框失去聚焦
    this.setData({
      isObservious:true,
    })
  },
  clearSearchValue(e){//重置
    this.data.isObservious=false;
    this.data.isSearch = "",
    this.data.searchResultMovies.rows = [];
    this.setData(this.data)
  },
  onSearchSubmit(event){//点击完成
    this.data.searchResultMovies.title = event.detail.value
    this.setData({
      isSearch:true
    })
   this.searchMovies()
  },
  searchMovies(){
    const { title, start, count } =this.data.searchResultMovies
    wx.showLoading({
      title:"loading",
      mask:true
    })
    new Promise((resolve,reject)=>{
      wx.request({
        url:"http://localhost:3000/movies/searchMovies", //仅为示例，并非真实的接口地址
        method:"post",
        data: {
          title,
          start,
          count
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          resolve(res.data)
        }
      })
    }).then(({rows})=>{
      wx.hideLoading();
      this.data.searchResultMovies.rows = [...this.data.searchResultMovies.rows,...rows.map((item)=>{
        item.title=item.title.length>5?item.title.substring(0,5)+"...":item.title;
        return item  
      })]
      this.setData(this.data)
    })
  },
  init(){//初始化渲染数据
    const { hotMovies , comingMovies } = this.data
    this.getMovies({
      start:hotMovies.start,
      count:hotMovies.count,
      url:hotMovies.url
    }).then((data)=>{
      this.data.hotMovies.rows = data.rows.map((item)=>{
        item.title=item.title.length>5?item.title.substring(0,5)+"...":item.title;
        return item  
      });
      this.setData(this.data)
    })
    this.getMovies({
      start:comingMovies.start,
      count:comingMovies.count,
      url:comingMovies.url
    }).then((data)=>{
      this.data.comingMovies.rows = data.rows.map((item)=>{
        item.title=item.title.length>5?item.title.substring(0,5)+"...":item.title;
        return item  
      });
      this.setData(this.data)
    })
    console.log(this)
  },
  getMovies({start=0,count=3,url}){//request发送请求
    return new Promise((resolve,reject)=>{
      wx.request({
        url,
        data: {
          start,
          count
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          resolve(res.data)
        }
      })
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})