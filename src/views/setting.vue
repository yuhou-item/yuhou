<template>
  <b-container>
    <YuhouNav :navTitle="navTitle"> </YuhouNav>
    <YuhouFooter></YuhouFooter>
    <YuhouBack></YuhouBack>
  </b-container>

</template>

<script>
import YuhouBack from '@/components/yuhouBack.vue'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
import player from '@/utils/player.js'
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
      MusicPlayer: null,
      navTitle: '设置',//传递给子组件的标题
      //个性化配置
    }
  },
  mounted () {
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
  },
  methods: {

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