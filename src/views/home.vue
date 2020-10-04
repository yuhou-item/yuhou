<template>
  <div>
    <b-container>
      <YuhouNav></YuhouNav>
      <b-row>
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
      </b-row>
      <!-- van 滑块 -->
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
      <b-row>
        <b-container>
          <b-row>
            <b-col class="col-lg-2">
              <b-button>&laquo;</b-button>
            </b-col>
            <b-col>
              <b-button class="col-lg-10"
                        :class="playClass"
                        @click="playToggle">{{playText}}</b-button>
            </b-col>
            <b-col class="col-lg-2">
              <b-button>&raquo;</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-container style="margin:10%;">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary"
                          type="button"
                          size="sm"
                          @click="searchSong">搜索歌曲</button>
                </div>
                <input type="text"
                       class="form-control mb-3"
                       placeholder=""
                       aria-label=""
                       v-model="songName"
                       aria-describedby="basic-addon1">
              </div>

            </b-container>
          </b-row>
        </b-container>
      </b-row>
      <YuhouFooter></YuhouFooter>
    </b-container>
  </div>
</template>

<script>
import YuhouFooter from '@/components/yuhouFooter.vue'
import YuhouNav from '@/components/yuhouNav.vue'
//初始化 miniapp 注入sdk
const MiniApp = window.MiniApp
//导入 与播放器有关的方法
import player from '@/utils/player.js'


export default {
  name: 'home',
  components: {
    YuhouNav,
    YuhouFooter,
    YuhouNav,
  },
  data () {
    return {

      /**bootstrap VUE 相关 */
      slide: 0,
      sliding: null,

      /**llayui相关 */
      layer: null,
      jquery: null,
      slider: null,
      ins1: null,//滑块

      /*播放器相关 */
      MusicPlayer: null,//音乐播放器实例
      songName: '',//搜索关键字/当前播放队列播放的歌曲
      playText: '播放',//播放|暂停 的文本显示信息
      playClass: 'btn btn-success',//播放|暂停 样式
      image_list: ["https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2132020113,4152666483&fm=26&gp=0.jpg"],//搜索到的歌曲的两张图
      song_msg: null,//当前播放的歌曲的详细信息
      song_length: 60 * 1000,//当前歌曲长度，单位毫秒
      song_value: 1100, //歌曲当前播放的位置
      album_audio_ids: null,//搜索到的歌曲id列表

      /**其他 */
    }
  },
  //初始化播放器，layui 
  mounted () {
    //如果需要使用 layui,需要打开 入口文件导入
    /* this.slider = layui.slider;
     this.layer = layui.layer;
     this.jquery = layui.jquery;*/
    let that = this
    //初始化 播放器 并获取播放器实例
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })

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

    /**播放|暂停 */
    playToggle () {
      if (this.playText === '播放') {
        this.playClass = 'btn btn-warning'
        this.playText = '暂停'
      }
      else {
        this.playClass = 'btn btn-success'
        this.playText = '播放'
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
    searchSong () {
      //console.log('名：', this.songName);
      this.getSongs(this.songName)
    },
    /** 更换歌曲时，更新进度条的最大值，单位是 秒，*/
    //当滑块位置发生变化时，切换歌曲的播放位置
    onChange (value) {
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
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>