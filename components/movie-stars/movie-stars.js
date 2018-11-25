// components/movie-stars/movie-stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    average:String,
    stars:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    average:"",
    stars:"",
    src:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready(){
    const stars = this.data.stars
    let total = 5,arr=[],src="";
    let a = stars[0];
    let b = stars[1];
    for(let i = 1; i<=stars[0]; i++){
      arr.push(1)
    }
    if(b==0){
      arr.push(0)
    }else if(b==5){
      arr.push(5)
    }
    for(let j = arr.length;j<total;j++){
      arr.push(0)
    }
    arr.map((item,index)=>{

      if(item ===0){
        src = "/images/icon/star_0.png"
      }else if(item ===1){
        src = "/images/icon/star_1.png"
      }else{
        src = "/images/icon/star_5.png"
      }
      this.data.src.push(src)
     this.setData({
       src:this.data.src
     })

  }) 
  }
})
