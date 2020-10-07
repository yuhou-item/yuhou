<template>
  <div>
    <b-container>
      <van-row>
        <!-- 搜歌组件,传递搜索方法给子组件调用 -->
        <YuhouSearchSong @father-search-song="searchSong">
        </YuhouSearchSong>
      </van-row>

      <!--歌曲专辑、轮播图-->
      <van-row>
        <b-container class="main">
          <b-carousel id="carousel-1"
                      no-wrap
                      v-model="slide"
                      :interval="4000"
                      controls
                      indicators
                      background="#ababab"
                      img-width="402500"
                      img-height="250"
                      style="text-shadow: 1px 1px 2px #333;"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd">
            <!-- bootstrap VUE 带文字的轮播图，是歌曲的专辑图片 -->
            <b-carousel-slide v-for="(img,index) in image_list"
                              :key="index"
                              caption="First slide"
                              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                              :img-src="img"></b-carousel-slide>
          </b-carousel>
        </b-container>
      </van-row>

      <!-- van 滑块，实时显示播放进度 -->
      <van-row>
        <b-container style="margin-top:10%;margin-bottom:10%;">
          <van-slider v-model="song_value"
                      :step="10"
                      @change="onChange"
                      :max="song_length"
                      active-color="#ee0a24">
            <template #button>
              <div class="custom-button">{{ song_value }}</div>
            </template>
          </van-slider>
        </b-container>
      </van-row>

      <!-- 显示歌曲信息 -->
      <van-row>
        <van-col offset="0"
                 span="3">
          <van-tag round
                   type="primary">{{tip_song_length}}</van-tag>
        </van-col>
        <van-col offset="17"
                 span="3">
          <van-tag round
                   type="success">{{tip_song_value}}</van-tag>
        </van-col>
      </van-row>

      <!-- 切换歌曲、暂停、播放歌曲按钮组 -->
      <van-row>
        <b-container>
          <van-grid :column-num="3">
            <van-grid-item>
              <b-button>&laquo;</b-button>
            </van-grid-item>
            <van-grid-item>
              <b-button :class="playClass"
                        @click="playToggle">{{playText}}</b-button>
            </van-grid-item>
            <van-grid-item>
              <b-button>&raquo;</b-button>
            </van-grid-item>
          </van-grid>
        </b-container>
      </van-row>
      <!-- 测试按钮，代码-->

      <van-row>
        <YuhouFooter></YuhouFooter>
      </van-row>

      <!-- 检测返回 组件 -->
      <van-row>
        <YuhouBack></YuhouBack>
      </van-row>
    </b-container>
  </div>
</template>

<script>
import YuhouBack from '@/components/yuhouBack.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouSearchSong from '@/components/yuhouSearchSong.vue'
//初始化 miniapp 注入sdk
const MiniApp = window.MiniApp
//导入 与播放器有关的方法
import player from '@/utils/player.js'
import utils from '@/utils/utils.js'
import { Toast } from 'vant';
export default {
  name: 'home',
  components: {
    YuhouSearchSong,
    YuhouFooter,
    YuhouNav,
    YuhouBack,
  },
  created () {

  },
  data () {
    return {
      /**bootstrap VUE 相关 */
      slide: 0,
      sliding: null,

      /*播放器相关 */
      MusicPlayer: null,//音乐播放器实例
      songName: '',//搜索关键字/当前播放队列播放的歌曲
      playText: '播放',//播放|暂停 的文本显示信息
      playClass: 'btn btn-success',//播放|暂停 样式
      image_list: ["https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2132020113,4152666483&fm=26&gp=0.jpg"],//搜索到的歌曲的两张图
      song_msg: null,//当前播放的歌曲的详细信息
      song_length: 0,//当前歌曲长度，单位毫秒
      song_value: 0, //歌曲当前播放的位置
      album_audio_ids: null,//搜索到的歌曲id列表
      tip_song_value: 0,//歌曲当前播放进度提示
      tip_song_length: utils.parseDurationToTime(0),//歌曲总长度提示
      stop_time: null,//用于停止定时器
      /**其他 */
      tipValueClass: 'tip-show-value'
    }
  },
  //初始化播放器，layui 
  mounted () {
    //如果需要使用 layui,需要打开 入口文件导入
    //初始化 播放器 并获取播放器实例
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })

  },
  watch: {//监听 歌曲当前长度，修改滑块长度
    song_value () {

    }
  },

  methods: {
    /**bootstrap VUE 轮播图方法 */
    onSlideStart (slide) {
      this.sliding = true
    },
    /**bootstrap VUE 轮播图方法 */
    onSlideEnd (slide) {
      this.sliding = false
    },
    // 这是一个定时器
    timer () {
      //动态设置 滑块长度
      this.stop_time = setInterval(() => {
        this.song_value += 1000;
        this.tip_song_value = utils.parseDurationToTime(this.song_value)
      }, 1000)
    },
    /**播放|暂停 */
    playToggle () {
      if (this.playText === '播放') {
        this.playClass = 'btn btn-warning'
        this.playText = '暂停'
        clearInterval(this.stop_time)
        this.timer()
      }
      else {
        this.playClass = 'btn btn-success'
        this.playText = '播放'
        //停止
        clearInterval(this.stop_time)
      }
      this.MusicPlayer.playToggle()
    },

    /** 根据关键字，搜索歌曲信息并播放*/
    setSongMsg (song) {
      //1
      this.album_audio_ids = song.album_audio_ids

      //2，设置歌曲长度
      this.song_length = parseInt(song.duration)
      // 并且设置播放起始位置为0
      this.song_value = 0
      console.log(typeof (song));

      //3 设置提示语
      this.tip_song_value = utils.parseDurationToTime(0)
      this.tip_song_length = utils.parseDurationToTime(this.song_length),//歌曲总长度提示

        //4  设置专辑图片
        this.image_list = song.image_list

      //5 ，设置样式
      this.playClass = 'btn btn-warning'
      this.playText = '暂停'

      //6 设置播放歌曲数据
      this.MusicPlayer.setData({
        album_audio_ids: song.album_audio_ids
      })

    },

    /**根据用户填写的歌曲，动态切换歌曲并播放 */
    searchSong (word) {
      //获取搜索到的歌曲信息
      var song = player.searchSong(word, 1, 1, 2)

      //设置歌曲信息
      this.setSongMsg(song)

      //清除定时器
      clearInterval(this.stop_time)

      //定时器，修改滑块和 显示
      this.timer()
    },

    /** 更换歌曲时，更新进度条的最大值，单位是 秒，*/
    onChange (value) {
      //提示当前是多少时间
      Toast({
        message: utils.parseDurationToTime(value),
      });
      //当滑块位置发生变化时，切换歌曲的播放位置
      //重新指定播放位置
      this.MusicPlayer.seek({
        position: value
      })
      let data = MiniApp.getAlbumsDetail({
        album_ids: this.album_audio_ids,
        success: function (res) {
          console.log("data:", res);
        },
        fail: function (err) {
          console.error(err)
        }
      })
    },
    /**测试，获取用户手机信息 */
    testPhone () {
      //如果是，修改适配
      // let result =
      //否则啥也不做

    }
  },
  destroyed () {
    clearInterval(this.stop_time)
  },
}
</script>

<style>
.main {
  margin-top: 10%;
}
.m-text {
  text-align: center;
  font-size: x-large;
  font-weight: bolder;
  color: aqua;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 0px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
/**是否显示提示当前进度 */
.tip-show-value {
  display: none;
}

.tip-hidden-value {
  display: block;
}

/**
Toast({
  message: '底部展示',
  position: 'bottom',
});
 */
</style>
 