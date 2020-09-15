<template>
  <section class="home">
    <main>
      <img alt="logo"
           src="@/assets/img/logo.png" />
      <div class="home__title">Hello!</div>
      <button class="button"
              @click="music">音乐</button><br>
      <button class="button"
              @click="playToggle">{{playStatus}}</button><br>
      <button class="button"
              @click="previous">上一首</button><br>
      <button class="button"
              @click="next">下一首</button><br>
    </main>
  </section>
</template>

<script>

import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole() // 初始化
const MiniApp = window.MiniApp
export default {
  name: 'Home',
  data () {
    return {
      playStatus: '暂停播放',
      MusicPlayer: null,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  created () {
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: false })
  },
  methods: {
    yuhou () {
      MiniApp.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
      MiniApp.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
        mask: true
      });
    },
    music () {
      MiniApp.showToast({
        title: '播放音乐中',
        icon: 'success',
        duration: 2000,
        mask: true
      });
      this.MusicPlayer.setData({
        album_audio_ids: MiniApp.getSongs({
          album_audio_ids: [32072514, 108735213],//["32072514", "108735213"],
          success: () => {
            alert('成功');
          },
          fail (errMsg, errCode) {
            alert(errMsg, errCode);
          }
        }
        )
      })
      this.MusicPlayer.play()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  width: 50px;
  height: 50px;
  background-color: #61dafb;
}
.home {
  height: 100%;
  width: 100%;
  background-color: #282c34;
  display: flex;
  &__title {
    font-size: 60px;
    margin-top: 40px;
    color: #ffffff;
  }

  &__link {
    margin-top: 20px;
    text-decoration: underline;
    color: #61dafb;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    text-align: center;
  }
}
</style>