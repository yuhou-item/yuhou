<template>
  <div>
    <b-container :class="{'big-screen-margin-top':big_screen_margin_top}">
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
            <van-grid-item>
              <b-button @click="testPhone">test</b-button>
            </van-grid-item>
          </van-grid>
        </b-container>
      </van-row>
      获取用户手机信息
      {{big_screen_margin_top}}
      <!-- 测试按钮，代码-->
      <YuhouFooter></YuhouFooter>
    </b-container>
  </div>
</template>

<script>

import YuhouFooter from '@/components/yuhouFooter.vue'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouSearchSong from '@/components/yuhouSearchSong.vue'
//初始化 miniapp 注入sdk
const MiniApp = window.MiniApp
//导入 与播放器有关的方法
import player from '@/utils/player.js'

import { Toast } from 'vant';
export default {
  name: 'home',
  components: {
    YuhouSearchSong,
    YuhouFooter,
    YuhouNav,
  },
  created () {

  },
  data () {
    return {
      //自定义样式相关
      big_screen_margin_top: player.judgeBigScreen(),

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
      tip_song_length: player.parseDurationToTime(0),//歌曲总长度提示
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
        this.tip_song_value = player.parseDurationToTime(this.song_value)

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
    getSongs (word) {
      let that = this
      MiniApp.searchSource({
        type: 1,
        keyword: word,
        page: 1,
        pageSize: 2,
        success: function (songs) {
          //1 歌曲id
          that.album_audio_ids = new Array()
          for (let i = 0; i < songs.song_data_list.length; i++)
            that.album_audio_ids.push(songs.song_data_list[i].album_audio_id)
          that.MusicPlayer.setData({
            album_audio_ids: that.album_audio_ids
          })

          //2 歌曲信息
          let then = that
          that.song_msg = MiniApp.getSongs({
            album_audio_ids: that.album_audio_ids,
            success: function (res) {
              console.log("失败！！！！！", res)
              //3 动态设置歌曲长度 /** 更换歌曲时，更新进度条的最大值，单位是 秒，*/
              then.song_length = parseInt(res.song_data_list[0].audio_info.duration)
              then.tip_song_length = player.parseDurationToTime(then.song_length)
              //并且设置播放起始位置为0
              then.song_value = 0


            },
            error: function (err) {
              console.error('error 失败！！！！！ error', error);
            }
          })
          console.log('歌曲长度,', that.song_length);

          //4 设置专辑图片
          that.image_list = new Array()
          for (let i = 0; i < songs.song_data_list.length; i++)
            that.image_list.push(songs.song_data_list[i].album_sizable_cover.replace('{size}/', ''))
          that.playClass = 'btn btn-warning'
          that.playText = '暂停'
        },
        error: function (err) {
          console.error(err)
        }
      })
    },
    /** 获取mv信息*/
    getMv (mvIdList) {
      let that = this
      MiniApp.getMVsDetail({
        mv_ids: mvIdList,
        success: function (res) {
          player.sendMsgToPC('res', { type: 'post' })
        },
        error: function (err) {
          console.error(err);
        }
      })
    },
    /**根据用户填写的歌曲，动态切换歌曲并播放 */
    searchSong (word) {
      console.log('名：', word);
      this.getSongs(word)
      clearInterval(this.stop_time)
      this.timer()//定时器，修改滑块和 显示
    },
    /** 更换歌曲时，更新进度条的最大值，单位是 秒，*/

    onChange (value) {
      //提示当前是多少时间
      Toast({
        message: player.parseDurationToTime(value),
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

/**全面屏适配，增加与顶部的外边距 */
.big-screen-margin-top {
  margin-top: 150px;
}

/**
Toast({
  message: '底部展示',
  position: 'bottom',
});
 */
</style>
 