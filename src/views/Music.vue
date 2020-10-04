<template>
  <div class="main">
    <b-row>
      <b-container>
        <router-link to="/"
                     style="margin-top:50px;maring-bottom:20px;"
                     class="m-text">back</router-link>
      </b-container>
    </b-row>
    <b-row>
      <router-view></router-view>
    </b-row>
    <van-swipe class="my-swipe"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="(image, index) in images"
                      :key="index">
        <img src="image"
             alt="">
      </van-swipe-item>
    </van-swipe>
    <AudioPlayer :audio-list="audioList"
                 :before-play="onBeforePlay"
                 @ended="onEnded"
                 @timeupdate="onTimeUpdate"
                 @loadedmetadata="onLoadedmetadata"
                 @pause="onPause" />
  </div>

</template>

<script>
import { AudioPlayer } from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

const MiniApp = window.MiniApp
export default {
  name: 'music',
  components: {
    AudioPlayer
  },
  data () {
    return {
      images: [
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2764393040,1235762150&fm=26&gp=0.jpg',
        'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1498462728,1887616453&fm=26&gp=0.jpg'
      ],
      audioList: [
        'http://txh-cdn.96qbhy.com/20180817175211dtC1vE3z.mp3',
        'http://txh-cdn.96qbhy.com/20181106105737sOcozMqw.mp3'
      ],
      song_data_list: null,
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
  methods: { // 播放前做的事
    onBeforePlay (next) {
      console.log('这里可以做一些事情...')
      this.MusicPlayer.setData({
        album_audio_ids: ["32072514", "108735213"]
      })
      this.MusicPlayer.play()
      next() // 开始播放
    },
    // 当前的播放位置发送改变时触发
    onTimeUpdate (event) {
      this.$emit('timeupdate', event)
      console.log('改变播放位置');
    },
    onEnded (event) {
      this.pause()
      this.currentTimeAfterFormat = this.formatTime(
        this.$refs.audio.currentTime
      )
      this.$emit('ended', event)
      if (this.isLoop) {
        this.playNext()
        this.play()
      }
    },
    onPause () {
      this.MusicPlayer.pause()
      this.$refs.audio.pause()
      this.$nextTick(() => {
        clearInterval(this.timer)
        this.timer = null
        this.isPlaying = false
        this.$emit('pause')
        console.log('暂停');
      })
    },
    // 播放上一首
    onPlayPrev () {
      console.log('播放上一首');
    },
    // 播放下一首
    onPlayNext () {
      console.log('播放下一首');
    }
    ,
    login () {
      MiniApp.searchSource({
        type: 1,
        keyword: "你好",
        page: 1,
        pageSize: 2,
        success: function (res) {
          console.log(res);
        }
      })
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
  top: 20%;
  position: relative;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  top: 1%;
  position: relative;
}
</style>