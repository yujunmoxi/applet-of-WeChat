// pages/video/video.js
var page = 1;
var url = "http://www.imooc.com/course/ajaxlist";


var getList = function(that){
  that.setData({
    hidden: false
  })

  wx.request({
    url: url,
    data: {
      page: page,
      scrollTop: 0 
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      var list = that.data.list;
      for(var i=0; i<res.data.list.length;i++){
        list.push(res.data.list[i])
      }

      that.setData({
       list: list
      })

      page++;

      that.setData({
        hidden:true
      })
    }
  })
}



Page({
  data:{
    scrollHeight:0,
    list:[],
    hidden:true,
    scrollTop:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    })

    getList(that);
  },
  refresh:function(){
    var that = this;
    page = 1;
    that.setData({
      list:[],
      scrollTop: 0
    })
    getList(that);

  },
  loadMore:function(){
    var that = this;
    getList(that);
  },
  showDetail:function(event){
    var id = event.target.dataset.id;

    wx.navigateTo({
      url: '/pages/videoDetail/videoDetail?id='+ id
    })
  },
  scroll:function(event){
    var that = this;
    console.log(event.detail.scrollTop)
    that.setData({
      scrollTop: event.detail.scrollTop
    })
  }
})