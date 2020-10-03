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
            <!-- Text slides with image -->

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
                        @click="play">{{playText}}</b-button>
            </b-col>
            <b-col class="col-lg-2">
              <b-button>&raquo;</b-button>
            </b-col>
            <b-col class="col-lg-2">
              <b-button @click="search">搜歌</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-container style="margin:50px;">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary"
                          type="button"
                          @click="changeSong">切换歌曲</button>
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
const MiniApp = window.MiniApp
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      songName: '',//搜索关键字
      slide: 0,
      sliding: null,
      MusicPlayer: null,//音乐播放器实例
      playText: '播放',//播放|暂停 的文本显示信息
      playClass: 'btn btn-success',//播放|暂停 样式
      image_list: null,//搜索到的歌曲的两张图
      songs_list: new Object(),//搜索到的歌曲列表
      song_msg: null,//当前播放的歌曲的详细信息
      layer: null,
      jquery: null,
      slider: null,
      song_length: null,
      album_audio_ids: null,//搜索到的歌曲id列表
      ins1: null,//滑块
    }
  },
  created () {

  },
  mounted () {
    this.slider = layui.slider;
    this.layer = layui.layer;
    this.jquery = layui.jquery;
    //渲染
    let that = this
    this.ins1 = this.slider.render({
      elem: '#slideTest1' //绑定元素
      , change: function (value) {
        console.log(value) //动态获取滑块数值
        // 指定位置播放歌曲
        that.seekToPosition(value)
        console.log('value变化了1', value);
      }
    })
    //初始化 播放器
    //获取播放器实例
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
    console.log("猪猪啊看那个:", this.MusicPlayer);

  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    //播放|暂停
    play () {
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
    searchSong (word) {


      let that = this
      MiniApp.searchSource({
        type: 1,
        keyword: word,
        page: 1,
        pageSize: 2,
        success: function (songs) {
          //歌曲id
          that.album_audio_ids = [songs.song_data_list[0].album_audio_id, songs.song_data_list[1].album_audio_id]
          console.log('zhuzhuakgn', that.MusicPlayer);
          that.MusicPlayer.setData({
            album_audio_ids: that.album_audio_ids
          })

          //歌曲信息
          let then = that
          that.song_msg = MiniApp.getSongs({
            album_audio_ids: that.album_audio_ids,
            success: function (res) {
              console.log("失败！！！！！", res)
              //动态设置歌曲长度
              then.song_length = parseInt(res.song_data_list[0].audio_info.duration)
              then.updateMaxProcess(then.song_length)
            },
            error: function (err) {
              console.error('error 失败！！！！！ error', error);
            }
          })
          console.log('歌曲长度,', that.song_length);

          //设置专辑图片
          that.image_list = new Array()
          that.image_list.push(songs.song_data_list[0].album_sizable_cover.replace('{size}/', ''))
          that.image_list.push(songs.song_data_list[1].album_sizable_cover.replace('{size}/', ''))
          that.sendMsgToPC(songs.song_data_list[1].album_sizable_cover.replace('{size}', '400/400'), { type: 'get' })
          that.MusicPlayer.play()
        },
        error: function (err) {
          console.error(err)
        }
      })
    },
    //搜歌按钮
    search () {
      //搜歌测试
      this.searchSong('李荣浩')
      //设置播放器数据
      /**/
    },
    //将信息发送到我的电脑的后台服务器，因为傻逼的 vconsole 不能复制调试信息
    sendMsgToPC (msg, obj) {
      if (obj.type === 'get') {//get 请求
        axios.get("/demo/kugou/receive", {
          params: { "msg": msg }
        }).then(res => {
          console.log('请求成功', res);
        }).catch(err => {
          console.log('请求失败', err);
        })
      } else {// post 请求
        axios.post("/demo/kugou/receive", {
          params: { "msg": msg }
        }).then(res => {
          console.log('请求成功', res);
        }).catch(err => {
          console.log('请求失败', err);
        })
      }
    },
    //获取mv信息
    getMv (mvIdList) {
      let that = this
      MiniApp.getMVsDetail({
        mv_ids: mvIdList,
        success: function (res) {
          that.sendMsgToPC('res', { type: 'post' })
        },
        error: function (err) {
          console.error(err);
        }
      })
    },
    //根据用户填写的歌曲，动态切换歌曲并播放
    changeSong () {
      //console.log('名：', this.songName);
      this.searchSong(this.songName)
    },
    //更换歌曲时，更新进度条的最大值，单位是 秒，
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
    //跳转到指定播放位置 ,单位，秒
    seekToPosition (second) {
      this.MusicPlayer.seek({ position: second })
    },

    //各种测试
    /* test () {
       //1 测试 获取 mv
       this.getMv(["159059"])
     },*/
  },
}
</script>

<style>
.main {
  margin-top: 100px;
}
.m-text {
  text-align: center;
  color: aqua;
}
</style>