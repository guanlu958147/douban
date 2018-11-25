// components/movie-grid/movie-grid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rows:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoading:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScrolltoupper(){
      console.log("onScrolltoupper")
    },
    onScrolltolower(){
      this.triggerEvent("onScrolltolower")
    }
  }
})
