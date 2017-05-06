Page({
  onLoad:function(){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - 80
        })
      }
    })
  },

  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {

    scrollHeight:0,
    music: {
        id:0,
        poster:'http://t.dyxz.la/upload/img/201702/poster_20170208_5874876_b.jpg!list',
        src:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
      },

    musicList:[
      {
        id:0,
        poster:'http://t.dyxz.la/upload/img/201702/poster_20170208_5874876_b.jpg!list',
        name:'极限特工3',
        author:'D·J·卡卢索 ',
        src:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
      },
      {
        id:1,
        poster:'http://t.dyxz.la/upload/img/201705/poster_20170503_1796053_b.jpg',
        name:'速度与激情8',
        author:'F·加里·格雷 ',
        src:'http://www.caiyiluo.online/music/6.mp3'
      },
      {
        id:2,
        poster:'http://t.dyxz.la/upload/img/201704/poster_20170415_6056107_b.jpg!list',
        name:'游戏规则',
        author:'高希希',
        src:'http://www.chinavane.online/music/1.mp3'
      },
      {
        id:3,
        poster:'http://t.dyxz.la/upload/img/201704/poster_20170404_2289724_b.jpg!list',
        name:'赌神2',
        author:' 王晶 ',
        src:'http://www.chinavane.online/music/2.mp3'
      },
      {
        id:4,
        poster:'http://www.chinavane.online/music/3.jpg',
        name:'说散就散',
        author:'JC',
        src:'http://www.chinavane.online/music/3.mp3'
      },
      {
        id:5,
        poster:'http://www.chinavane.online/music/4.jpg',
        name:'韩国style',
        author:'泡泡',
        src:'http://www.chinavane.online/music/4.mp3'
      }
    ]



  },

  playMusic:function(event){
    var idx = event.target.dataset.idx;
    var that = this;
    console.log(this.data.musicList[idx])
    that.setData({
      music: this.data.musicList[idx] // 我们获取到了一个下标，然后通过这个下标去查找musicList中的对应位置的对象，然后再把这个对象设置到music这个数据内容中
    })
    
    setTimeout(function(){
       that.audioCtx.play();
    },500)
   

      
  },

  endedHandle:function(){
    var that = this;
    var pos = 0;
    if( that.data.music.id + 1 >= that.data.musicList.length ){
      pos = 0;
    }else{
      pos = that.data.music.id + 1;
    }

    var playingMusic= that.data.musicList[pos];
    that.setData({
      music: playingMusic
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)

  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(30)//快进到多少秒
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  }
})