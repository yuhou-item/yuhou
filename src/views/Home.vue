<template>
  <div class="main">
    <button class="button"
            @click="login">登录</button><br>
    <button class="button"
            @click="music">音乐</button><br>
    <button class="button"
            @click="playToggle">{{playStatus}}</button><br>
    <button class="button"
            @click="previous">上一首</button><br>
    <button class="button"
            @click="next">下一首</button><br>
    <audio :src="mp3"></audio>
  </div>

</template>

<script>

import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole() // 初始化
const MiniApp = window.MiniApp
export default {
  name: 'Home',
  data () {
    return {
      mp3: null,
      playStatus: '暂停播放',
      MusicPlayer: null,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  created () {
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
  },
  methods: {
    music () {
      this.MusicPlayer.setDataUrl({
        "url": "http://fs.open.kugou.com/3381df8a1f1dff47bccdf3cfbc7ea7aa/5d906167/G005/M06/1A/0D/pYYBAFS-HI-ARBxrADMdDZ2OLOs097.mp3"
      })
      //判断是否可用 播放器
      const errMessage = MiniApp.canIUse('MusicPlayer')
      console.log('是否可用', errMessage.errMsg, errMessage.value);
      this.MusicPlayer.play({
        success: function () {
          console.log('正在播放中');

        },
        fail: function () {
          console.log('播放失败!');
        }
      })
      //this.mp3 = 
    },
    playToggle () {
      this.MusicPlayer.playToggle()
      if (this.playStatus === '暂停播放')
        this.playStatus = '继续播放'
      else
        this.playStatus = "暂停播放"
    },
    previous () {
      this.MusicPlayer.playPrevious()
    },
    next () {
      this.MusicPlayer.playNext()
    },
    login () {
      MiniApp.listenOpenLogin({
        success (res) {
          console.log(res);
        },
        fail (res) {
          console.log(res);
        },
        complete (res) {
          console.log(res);
        }
      })
    },
  }
}
</script>

<style lang="css" scoped>
.button {
  width: 120px;
  height: 120px;
  background-color: #61dafb;
  margin: 10px;
}
.main {
  padding: 20px;
  left: 40%;
  top: 30%;
  position: relative;
}
</style>