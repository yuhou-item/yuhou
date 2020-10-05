<template>
  <b-container>
    <YuhouNav></YuhouNav>
    <b-row>
      <b-container>
        <AudioPlayer :audio-list="audioList"
                     :before-play="onBeforePlay"
                     @ended="onEnded"
                     @timeupdate="onTimeUpdate"
                     @pause="onPause" />
      </b-container>
    </b-row>
    <YuhouFooter></YuhouFooter>
  </b-container>

</template>

<script>
import { AudioPlayer } from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
const MiniApp = window.MiniApp
export default {
  name: 'music',
  components: {
    YuhouNav,
    AudioPlayer,
    YuhouFooter,
  },
  data () {
    return {
      audioList: [
        'http://txh-cdn.96qbhy.com/20180817175211dtC1vE3z.mp3',
        'http://txh-cdn.96qbhy.com/20181106105737sOcozMqw.mp3'
      ],
      song_data_list: null,
      playStatus: '暂停播放',
      MusicPlayer: null,
    }
  },
  created () {
    //this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
  },
  methods: { // 播放前做的事
    onBeforePlay (next) {
      console.log('这里可以做一些事情...')
      /*  this.MusicPlayer.setData({
          album_audio_ids: ["32072514", "108735213"]
        })
        this.MusicPlayer.play()*/
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
      /*  MiniApp.searchSource({
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
        })*/
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