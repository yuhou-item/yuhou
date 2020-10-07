<template>
  <b-container>
    <YuhouNav :navTitle="navTitle"> </YuhouNav>
    <b-row>
      <b-container>
        <button @click="login">用户登录测试</button>
        <hr>
        <button @click="collectSong">收藏单曲测试</button>
        <hr>
        <button @click="getUserInfo">获取用户信息测试</button>
        <hr>
        <button @click="searchAudio">搜索专辑我喜欢测试</button>
        <hr>
        <button @click="testEntity">测试实体类</button>
        <hr>
        <button @click="exit">退出小程序</button>
        <hr>
        <button @click="getLocation">获取用户当前位置</button>
        <hr>
        <button @click="getDiskSpaceInfo">获取用户存储空间信息</button>
        <hr>
        <van-row>
          <!-- 显示用户信息-->
          <ul v-if="userInfo!=null">
            <li v-for="(value,key,index) in userInfo"
                :key="index">{{key}}:{{value}}</li>

          </ul>
        </van-row>
      </b-container>
    </b-row>
    <YuhouFooter></YuhouFooter>
    <YuhouBack></YuhouBack>
  </b-container>

</template>

<script>
import YuhouBack from '@/components/yuhouBack.vue'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
import player from '@/utils/player.js'
import utils from '@/utils/utils.js'
import Cookies from 'js-cookie' //引入cookie操作依赖
import system from '@/utils/system.js' //引入miniapp 系方面的操作依赖
const MiniApp = window.MiniApp
export default {
  name: 'music',
  components: {
    YuhouNav,
    YuhouFooter,
    YuhouBack,
  },
  data () {
    return {
      list: new Array(),//存放五种搜索资源方式搜索到的资源
      /*audioList: [
        'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
        'http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3',
        'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
        'https://media.w3.org/2010/05/sintel/trailer.mp4',
        'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      ],*/
      navTitle: '听歌猜曲',//传递给子组件的标题
      MusicPlayer: null,//播放器单例

      userInfo: {}//用户信息
    }
  },
  mounted () {
    //初始化播放器
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
    //监听事件
    MiniApp.on({
      event: 'onLogin',
      listener () {
        this.loginOut()
      }
    });
  },
  methods: {
    //打开登录
    login () {
      system.login()
    },

    //退出登录
    loginOut () {
      console.log('成功退出登录');
    },

    //收藏到我喜欢测试
    collectSong () {
      console.log('我进来了');
      var song = player.searchSong('有为', 1, 1, 2)
      console.log('somg', song);
      MiniApp.collectSong({
        album_audio_ids: song.album_audio_ids,
        success: (res) => {
          console.log('收藏到我喜欢;', res);
        },
        fail: () => {
          console.log('失败');
        },
        complete: () => {
          console.log('完成');
        }
      })
    },
    //获取用户信息
    getUserInfo () {
      MiniApp.getUserInfo({
        success: (res) => {
          //发送到后台
          utils.sendMsgToPC({ "msg": JSON.stringify(res) }, { "type": 'get' });
          console.log('用户信息:', res);
          //存入cookie
          Cookies.set('userInfo', JSON.stringify(res))
          this.userInfo = JSON.parse(Cookies.get('userInfo'))
        },
        fail (res) {
          console.log(res);
        },
        complete (res) {
          console.log('完成');
        }
      });
    },
    //获取专辑信息，我喜欢
    searchAudio () {
    },
    //测试五种搜索歌曲方式
    testEntity () {
      this.list.push(player.searchSong('我喜欢', 1).res)
      this.list.push(player.searchSong('我喜欢', 2).res)
      this.list.push(player.searchSong('我喜欢', 3).res)
      this.list.push(player.searchSong('我喜欢', 4).res)
      this.list.push(player.searchSong('我喜欢', 5).res)
    },
    //小程序在后台
    exit () {
      system.exit()
    },
    //获取用户当前位置
    getLocation () {
      system.getLocation()
    },
    //获取用户存储空间信息
    getDiskSpaceInfo () {
      console.error('system.getDiskSpaceInfo():', system.getDiskSpaceInfo());
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
  font-size: 50px;
  line-height: 250px;
  text-align: center;
  background-color: #39a9ed;
  top: 1%;
  position: relative;
}
</style>