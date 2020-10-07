<!-- 共用组件,-->
<template>
  <div :class="{'big-screen-margin-top':big_screen_margin_top}">
    <van-nav-bar left-text="返回"
                 @click-left="back"
                 left-arrow>
      <!-- 插槽自定义使用了标题-->
      <template #title>
        {{navTitle}}
      </template>
    </van-nav-bar>

  </div>
</template>

<script>
//导入 与播放器有关的方法
import utils from '@/utils/utils.js'
export default {
  name: 'yuhouNav',
  data () {
    return {
      //自定义样式相关
      big_screen_margin_top: utils.judgeBigScreen(),
    }
  },
  //接受来自父组件的 自定义标题内容
  props: {
    // 第二步，使用props接收.
    navTitle: {
      type: String,
      default: '鱼猴' //没有传值使用默认值
    }
  },
  mounted () {
  },
  methods: {
    //返回首页 index.vue
    back () {
      this.$router.push('/', { params: { 'time': new Date() } })
    },
  }
}
</script>
<style scoped>
.hidden {
  display: none;
}
.show {
  display: block;
}

/**全面屏适配，增加与顶部的外边距 */
.big-screen-margin-top {
  margin-top: 150px;
}
</style>