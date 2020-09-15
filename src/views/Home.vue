<template>
  <section class="home">
    <main>
      <img alt="logo"
           src="@/assets/img/logo.png" />
      <div class="home__title">Hello!</div>
      <button @click="yuhou">登录</button><br>
      <button @click="music">音乐</button><br>
      <button @click="stop">停止播放</button><br>
      <van-image width="10rem"
                 height="10rem"
                 fit="contain"
                 src="https://img.yzcdn.cn/vant/cat.jpeg"
                 rel="external nofollow" />
    </main>
  </section>
</template>

<script>

import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
import { Button } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Image } from 'vant';
let vConsole = new VConsole() // 初始化
const MiniApp = window.MiniApp
const MusicPlayer = MiniApp.createMusicPlayer({ isInner: false })
export default {
  name: 'Home',
  data () {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
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
      MusicPlayer.setData({
        album_audio_ids: MiniApp.getSongs({
          album_audio_ids: ["32072514", "108735213"],
          success: () => {
            alert('成功');
          },
          fail (errMsg, errCode) {
            alert(errMsg, errCode);
          }
        }
        )
      })

      MusicPlayer.play()
    },
    stop () {
      MusicPlayer.stop()
    }
  }
}
</script>

<style lang="scss" scoped>
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