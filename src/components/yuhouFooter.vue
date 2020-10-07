<!-- 底部导航栏共用组件-->
<template>
  <b-container>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace
                       to="/home"
                       icon="home-o">
        home
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/music"
                       icon="music-o">
        music
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/game"
                       icon="certificate">
        game
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/test"
                       icon="video-o">
        test
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/setting"
                       icon="setting-o">
        setting
      </van-tabbar-item>
    </van-tabbar>
  </b-container>
</template>
<script>
export default {
  name: 'yuhouFooter',

}
</script>
<style scoped>
</style>