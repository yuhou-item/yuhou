<template>
  <b-container>
    <YuhouNav :navTitle="navTitle"> </YuhouNav>

    <!-- 1 答题介绍开始 -->
    <YuhouGameIntroduction :class="{'show':show,'hidden':hidden}"
                           @go="go"></YuhouGameIntroduction>
    <!-- 1 答题介绍结束 -->

    <!-- 2 选择题型 开始 
    <YuhouGameSelectItem :class="{'show':selectShow,'hidden':selectHidden}"
                         @reading="reading"></YuhouGameSelectItem>
     -->
    <!-- 2 选择题型 结束 -->

    <!-- 3 答题区域 开始 -->
    <YuhouGameQuestion @backTo="backTo"
                       :class="{'show':questionShow,'hidden':questionHidden}"></YuhouGameQuestion>

    <!-- 3 答题区域 结束-->

    <!-- 底部路由切换组件 -->
    <YuhouFooter></YuhouFooter>

    <!-- 监听手机返回键组件 -->
    <YuhouBack></YuhouBack>
  </b-container>

</template>

<script>
/**导入用到的所有复用组件 */
import YuhouBack from '@/components/yuhouBack.vue'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
import YuhouGameQuestion from '@/components/yuhouGameQuestion.vue'
import YuhouGameIntroduction from '@/components/yuhouGameIntroduction.vue'
import YuhouGameSelectItem from '@/components/yuhouGameSelectItem.vue'

/**导入封装好的常用方法 */
import player from '@/utils/player.js'
import utils from '@/utils/utils.js'
import system from '@/utils/system.js'
import entity from '@/utils/entity.js'

/**miniapp sdk 注入 */
const MiniApp = window.MiniApp

//vant 提示语
import { Notify } from 'vant';
export default {
  name: 'game',
  components: {
    YuhouNav,
    YuhouFooter,
    YuhouBack,
    YuhouGameQuestion,
    YuhouGameIntroduction,
    YuhouGameSelectItem,
  },
  data () {
    return {
      /**播放器实例 */
      MusicPlayer: null,

      /**控制组件显示 开始*/
      hidden: false,
      show: true,//是否显示欢迎答题区域
      selectHidden: true,
      selectShow: false,//是否显示选择题型
      questionHidden: true,
      questionShow: false,//是否显示题目
      /**控制组件显示 结束*/

      /**传递给组件 YuhouNav 的标题 */
      navTitle: '猜曲',

    }
  },
  mounted () {
    /**初始化播放器实例 */
    //this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
  },
  methods: {
    /**开始游戏 */
    go () {
      //隐藏答题欢迎界面
      this.show = false
      this.hidden = true

      /*//展示选择题型界面
      this.selectShow = true
      this.selectHidden = false
       */
      //取消题型，直接答题了,如果想要，需要把下面的代码去掉，并把最上面注释的两行代码放开
      //隐藏选择题型界面

      //展示题目
      this.questionShow = true
      this.questionHidden = false

      //提示语
      Notify({
        type: 'primary',
        message: `你将有最多 ${this.$store.getters.getMaxTime} 秒的时间来判断这首歌的信息,超时停止播放，并从中选出一个正确答案，对一个加一分`,
        duration: 8600,
      });
    },
    //exit game
    backTo () {
      // 隐藏 题目
      this.questionShow = false
      this.questionHidden = true

      // 展示 答题欢迎界面
      this.show = true
      this.hidden = false
    },
    /**准备答题 */
    reading () {
      //隐藏选择题型界面
      this.selectShow = false
      this.selectHidden = true

      //展示题目
      this.questionShow = true
      this.questionHidden = false

      //开始播放
      this.playerSource()
      //开始计时，当超过 了最大时间，停止播放
      console.log('我进来了');

    },
    /**展示题目 */
    showQuestion () {

    },
    /**播放 */
    playerSource () {
      //播放 ... MiniApp. ...

      //处理逻辑
      /*console.log(`开始播放了，${this.maxTime} 秒后停止，也可以自行停止`);
      setTimeout(() => {
        console.log('时间到了')
      }, this.maxTime * 1000)*/
    },
    /**停止播放 */
    stopSource () {
      // clearTimeout(1)
      // console.log('已停止播放');
    },

  }
}
</script>

<style lang="css" scoped>
.show {
  display: block;
}

.hidden {
  display: none;
}
</style>