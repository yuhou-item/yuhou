<template>
  <div>
    <b-container>
      <b-row>
        <div class="media"
             style="margin-top:40px;">
          <div class="media-body">
            <h5 class="mt-0 mb-1">Media object</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </div>
          <img class="ml-3"
               src="@/assets/img/logo.png"
               alt="Generic placeholder image">
        </div>
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
                              img-src="img"></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
              <h1>Hello world!</h1>
            </b-carousel-slide>
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
              <b-button @click="playPrevious">&laquo;</b-button>
            </b-col>
            <b-col>
              <b-button :class="playClass"
                        @click="play">{{playText}}</b-button>
            </b-col>
            <b-col class="col-lg-2">
              <b-button @click="playNext">&raquo;</b-button>
            </b-col>
            <b-col class="col-lg-2">
              <b-button @click="search">搜歌</b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const MiniApp = window.MiniApp
export default {
  name: 'home',
  data () {
    return {
      slide: 0,
      sliding: null,
      playText: '播放',
      playClass: 'btn btn-success',
      MusicPlayer: null,
      image_list: []
    }
  },
  created () {

  },
  mounted () {
    var slider = layui.slider;
    //渲染
    slider.render({
      elem: '#slideTest1' //绑定元素
      , change: function (value) {
        console.log(value) //动态获取滑块数值
        console.log('滑块发生变化')
      }
    })
    //初始化 播放器
    //获取播放器实例
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
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
        this.MusicPlayer.setData({
          album_audio_ids: ["32072514", "108735213"]
        })
        this.MusicPlayer.play()
      }
      else {
        this.playClass = 'btn btn-success'
        this.playText = '播放'
        this.MusicPlayer.stop()
      }


    },
    //搜歌按钮
    search () {
      //搜歌测试
      const songs = this.searchSong('十年')
      console.log(songs);
      //设置播放器数据
    },
    //播放上一首
    playPrevious () {

    },

    //播放下一首
    playNext () {

    },
    searchSong (keyword) {
      var songs = null
      MiniApp.searchSource({
        type: 1,
        keyword: keyword,
        page: 1,
        pageSize: 2,
        success: function (res) {
          songs = res
        }
      })
      return songs
    },
  },
}
</script>

<style>
.main {
  margin-top: 100px;
}
</style>