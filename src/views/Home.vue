<template>
  <div>
    <b-container>
      <b-row>
        <b-container>
          <p style="margin:50px;"
             class="m-text">hello yuhou </p>
        </b-container>
      </b-row>
      <b-row>
        <b-container class="main">
          <b-carousel id="carousel-1"
                      v-model="slide"
                      :interval="4000"
                      controls
                      indicators
                      background="#ababab"
                      img-width="1024"
                      img-height="480"
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

      <!-- layui 滑块 -->
      <b-row>
        <b-container style="margin:30px;">
          <div id="slideTest1"></div>
        </b-container>
      </b-row>
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
            <b-container style="margin:50px;">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary"
                          type="button"
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
    </b-container>
  </div>
</template>

<script>

//初始化 miniapp 注入sdk
const MiniApp = window.MiniApp
//导入 与播放器有关的方法
import player from '@/utils/player.js'


export default {
  name: 'home',
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
      image_list: null,//搜索到的歌曲的两张图
      song_msg: null,//当前播放的歌曲的详细信息
      song_length: null,//当前歌曲长度，单位毫秒
      album_audio_ids: null,//搜索到的歌曲id列表

      /**其他 */
    }
  },
  //初始化播放器，layui 
  mounted () {
    this.slider = layui.slider;
    this.layer = layui.layer;
    this.jquery = layui.jquery;
    //渲染
    let that = this
    this.ins1 = this.slider.render({
      elem: '#slideTest1' //绑定元素
      , change: function (value) {
        // 指定位置播放歌曲
        that.seekToPosition(value)
      }
    })
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
          that.album_audio_ids = [songs.song_data_list[0].album_audio_id, songs.song_data_list[1].album_audio_id]
          that.MusicPlayer.setData({
            album_audio_ids: that.album_audio_ids
          })

          //2 歌曲信息
          let then = that
          that.song_msg = MiniApp.getSongs({
            album_audio_ids: that.album_audio_ids,
            success: function (res) {
              console.log("失败！！！！！", res)
              //3 动态设置歌曲长度
              then.song_length = parseInt(res.song_data_list[0].audio_info.duration)
              then.updateMaxProcess(then.song_length)
            },
            error: function (err) {
              console.error('error 失败！！！！！ error', error);
            }
          })
          console.log('歌曲长度,', that.song_length);

          //4 设置专辑图片
          that.image_list = new Array()
          that.image_list.push(songs.song_data_list[0].album_sizable_cover.replace('{size}/', ''))
          that.image_list.push(songs.song_data_list[1].album_sizable_cover.replace('{size}/', ''))
          player.sendMsgToPC(songs.song_data_list[1].album_sizable_cover.replace('{size}', '400/400'), { type: 'get' })
          that.MusicPlayer.play()
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
    updateMaxProcess (max) {
      let that = this
      //渲染
      this.ins1 = this.slider.render({
        elem: '#slideTest1' //绑定元素
        , change: function (value) {
          console.log('value变化了2', value);
          // 指定位置播放歌曲
          that.seekToPosition(value)
        },
        max: max//设置最大值为歌曲的毫秒数
      })
    },
  },

  seekToPosition (second) {
    this.MusicPlayer.seek({
      position: second
    })
  },


}
</script>

<style>
.main {
  margin-top: 100px;
}
.m-text {
  text-align: center;
  font-size: x-large;
  font-weight: bolder;
  color: aqua;
}
</style>