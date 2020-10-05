<!-- 鱼猴音乐播放器组件，使用了 开源的 audio vue 组件-->
<template>
  <b-container>
    <YuhouNav :navTitle="navTitle"> </YuhouNav>
    <b-row>
      <b-container>
        <AudioPlayer :audio-list="audioList"
                     :before-play="onBeforePlay"
                     @ended="onEnded"
                     @play-prev="onPlayPrev"
                     @play-next="onPlayNext"
                     @playing="onPlaying"
                     @loadedmetadata="onLoadedmetadata"
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
        'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
        'http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3',
        'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
        'https://media.w3.org/2010/05/sintel/trailer.mp4',
        'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      ],
      song_data_list: null,
      playStatus: '暂停播放',
      MusicPlayer: null,
      navTitle: '音乐',//传递给子组件的标题
    }
  },
  created () {
    //this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
  },
  methods: {
    onBeforePlay (play) {
      play()//开始播放
      console.log('这里可以做一些事情...')
    },
    // 当前的播放位置发送改变时触发
    onTimeUpdate (event) {
      console.log('改变播放位置');
    },
    onEnded (event) {
      console.log('onEnded');
    },
    onPause () {
      this.$emit('pause')
      console.log('onPause');
    },
    // 播放上一首
    onPlayPrev () {
      console.log('onPlayPrev');
    },
    // 播放下一首
    onPlayNext () {
      console.log('onPlayNext');
    },
    onPlaying () {
      //console.log('onPlaying');
    }
    ,
    onLoadedmetadata (event) {
      console.log('onLoadedmetadata');
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