<!-- 搜索歌曲组件 -->
<!-- 共用组件,-->
<template>
  <div :class="{'big-screen-margin-top':big_screen_margin_top}">
    <van-nav-bar left-text="返回"
                 @click-left="back"
                 @click-right="search"
                 left-arrow>
      <!-- 插槽自定义使用了标题-->
      <template #title>
        <span class="text-success">
          {{navTitle}}
        </span>
      </template>
      <template #right>
        <van-icon name="search"
                  size="18" />
      </template>
    </van-nav-bar>
    <div :class="{'hidden':isHidden}">
      <van-search v-model="value"
                  shape="round"
                  @search="searchSong()"
                  placeholder="请输入搜索关键词" />
    </div>
  </div>
</template>

<script>
//导入 与播放器有关的方法
import utils from '@/utils/utils.js'

export default {
  name: 'yuhouSearchSong',
  data () {
    return {
      isHidden: true,
      value: '',//搜索关键字
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
  methods: {
    //返回首页 index.vue
    back () {
      this.$router.push('/', { params: { 'time': new Date() } })
    },
    //搜索歌曲图标，显示搜索框
    search () {
      this.isHidden = false
      console.log('search');
    },
    //真正的搜索功能
    searchSong () {
      console.log('searchsongs');
      this.isHidden = true
      //调用父组件的搜歌方法，并播放歌曲等
      //使用 this.$emit(参数1：'接收方法名',参数2：方法参数) //接收方法名 是@后面的方法
      this.$emit('father-search-song', this.value)

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