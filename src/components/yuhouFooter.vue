<!-- 底部导航栏共用组件-->
<template>
  <b-container>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace
                       to="/music"
                       icon="clear">
        music
      </van-tabbar-item>

      <van-tabbar-item replace
                       to="/test"
                       icon="clear">
        test
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/home"
                       icon="music-o">
        home
      </van-tabbar-item>
      <van-tabbar-item replace
                       to="/game"
                       icon="service-o">
        game
      </van-tabbar-item>

      <van-tabbar-item replace
                       to="/user"
                       icon="user-o">
        user
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