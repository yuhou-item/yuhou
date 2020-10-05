<!-- 共用组件,-->
<template>
  <div>
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
export default {
  name: 'yuhouNav',
  data () {
    return {
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
    console.log('值：', this.navTitle);
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
</style>