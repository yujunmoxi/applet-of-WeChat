function parseLyric(lrc) {
	    var lyrics = lrc.split("\n");
	    var lrcObj = {};
	    for(var i=0;i<lyrics.length;i++){
	        var lyric = decodeURIComponent(lyrics[i]);
	        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
	        var timeRegExpArr = lyric.match(timeReg);
	        if(!timeRegExpArr)continue;
	        var clause = lyric.replace(timeReg,'');
	        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
	            var t = timeRegExpArr[k];
	            var min = Number(String(t.match(/\[\d*/i)).slice(1)), sec = Number(String(t.match(/\:\d*/i)).slice(1));
	            var time = min * 60 + sec;
	            lrcObj[time] = clause;
	        }
	    }
	    return lrcObj;
	}

var musicLrc = {};


Page({
  onLoad:function(){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - 120
        })
      }
    })

musicLrc = parseLyric(that.data.music.lrc)
  
  wx.request({
      url: 'http://chinayj.online/music.php', 
      dataType:'json',
      success: function(res) {
       that.setData({
         musicList:res.data
       })
      }
    })
  },


  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    count:0,
    scrollHeight:0,
    music: {
        id:0,
        poster:'http://chinayj.online/music/1.jpg',
        name:'祈愿',
        author:'张艺兴',
        src:'http://chinayj.online/music/1.mp3',
        lrc:`[ti:我好想你]
[ar:祈愿]
[al:]
[by:密斯特斯*余]
[00:02.47]我好想你
[00:03.91]词曲：吴青峰
[00:06.86]演唱：张艺兴
[00:09.96]代码男神：余俊
[00:39.06]开了灯 眼前的模样
[00:43.33]偌大的房 寂寞的床
[00:51.66]关了灯 全都一个样
[00:55.80]心里的伤 无法分享
[01:02.15]生命随年月流去
[01:06.54]随白发老去
[01:09.87]随着你离去 快乐渺无音讯
[01:16.26]随往事淡去
[01:18.99]随梦境睡去
[01:22.26]随麻痹的心逐渐远去
[01:27.19]我好想你 好想你
[01:33.49]却不露痕迹
[01:40.27]我还踮着脚思念
[01:46.25]我还任记忆盘旋
[01:52.59]我还闭着眼流泪
[01:58.61]我还装作无所谓
[02:05.22]我好想你 好想你
[02:11.44]却欺骗自己
[02:45.47]开了灯 眼前的模样
[02:49.48]偌大的房 寂寞的床
[02:57.75]关了灯 全都一个样
[03:01.99]心里的伤 无法分享
[03:08.30]生命随年月流去
[03:12.66]随白发老去
[03:15.97]随着你离去 快乐渺无音讯
[03:22.54]随往事淡去
[03:25.36]随梦境睡去
[03:28.53]随麻痹的心逐渐远去
[03:33.38]我好想你 好想你
[03:39.66]却不露痕迹
[03:46.31]我还踮着脚想念
[03:52.46]我还任记忆盘旋
[03:58.87]我还闭着眼流泪
[04:05.07]我还装作无所谓
[04:14.43]我好想你 好想你
[04:20.64]却欺骗自己
[04:26.89]我好想你 好想你
[04:33.23]就当作秘密
[04:39.63]我好想你 好想你
[04:46.21]就深藏在心
[04:52.73]`
      },

    musicList:''

  },

  playMusic:function(event){
    var idx = event.target.dataset.idx;
    var that = this;
    that.setData({
      music: this.data.musicList[idx] 
    })
    
    setTimeout(function(){
       that.audioCtx.play();
    },500)
      
  },

  endedHandle:function(){
    var that = this;
    var pos = 0;
    if( that.data.music.id  >= that.data.musicList.length ){
      pos = 0;
    }else{
      pos = that.data.music.id ;
    }

    var playingMusic= that.data.musicList[pos];
    that.setData({
      music: playingMusic
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)

  },
  // audioPlay: function () {
  //   this.audioCtx.play()
  // },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(300)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }, 
  pro:function(event){
    var that = this;
    var second = parseInt(event.detail.currentTime);  
    var per = event.detail.currentTime / event.detail.duration;

    that.setData({
      count:parseInt(per*100),
      musicText:musicLrc[second]
    })
  }, 
  // 上一曲
 preventPlay:function(){
    var that = this;
    var pos = 0;
    if( that.data.music.id <= 0 ){
      pos = that.data.musicList.length ;
    }else{
      pos = that.data.music.id ;
    }

    var playingMusic= that.data.musicList[pos];
    that.setData({
      music: playingMusic
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)
  },
  //中间播放功能
  // audioPlay:function(){
  //   var that = this;
  //   var pos =0;
    
  //   if(that.data.start == play){

  //   }
    
  //   var playingMusic= that.data.musicList[pos];
  //   that.setData({
  //     music: playingMusic
  //   })

  //   setTimeout(function(){
  //     that.audioCtx.play();
  //   },500)
  // },
  // 下一曲 
  nextPlay:function(){
    var that = this;
    var pos = 0;
    if( that.data.music.id >= that.data.musicList.length ){
      pos = 0;
    }else{
      pos = that.data.music.id  ;
    }

    var playingMusic= that.data.musicList[pos];
    that.setData({
      music: playingMusic
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)
  }
  
})