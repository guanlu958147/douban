// components/movie-list/movie-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    url:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:"",
    url:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapMore(){
      this.triggerEvent("onTapMore",{
        title:this.data.title,
        url:this.data.url
      })
    }
  }
})
