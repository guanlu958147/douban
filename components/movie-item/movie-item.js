// components/movie-item/movie-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    movie:{}
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    handleMovieInfo:function(){
      this.triggerEvent("handleMovieInfo",{
        movie:this.data.movie
      })
    }
  }
})
