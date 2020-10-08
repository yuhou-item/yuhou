<!--显示题目组件-->
<template>
  <b-container>
    <br>
    <b-card title=""
            header-tag="header"
            footer-tag="footer">
      <template v-slot:header>
        <h6 class="mb-0">
          <van-row>
            <van-col offset="0"
                     span="6">
              <span class="text-primary">积分:{{countScore}}</span>
            </van-col>
            <van-col offset="1"
                     span="8">
              <span class="text-info">总答题:{{countQuestion}}</span>
            </van-col>
            <van-col offset="1"
                     span="8">
              <span class="text-success">答对数:{{countRight}}</span>
            </van-col>
          </van-row>

        </h6>
      </template>
      <b-card-text>
        <van-row>
          <van-col offset="10">
            <van-count-down ref="countDown"
                            millisecond
                            :time="maxTime*1000"
                            :auto-start="false"
                            format="ss"
                            @finish="finish" />
          </van-col>
        </van-row>
        <van-row>
          <van-grid clickable>
            <van-col offset="1"
                     span="10">
              <van-button icon="play-circle-o"
                          type="primary"
                          id="disabled"
                          @click="start">
                开始
              </van-button>
            </van-col>
            <van-col offset="3"
                     span="10">
              <van-button icon="replay"
                          @click="reset"
                          type="info">
                换题
              </van-button>
            </van-col>
          </van-grid>
        </van-row>
      </b-card-text>
    </b-card>
    <br>
    <!-- 题目选项 开始 -->
    <b-card title=""
            header-tag="header"
            footer-tag="footer">
      <template v-slot:header>
        <b-form-group :label="question">
          <b-form-radio-group id="radio-group-1"
                              stacked
                              v-model="selected"
                              :options="options"
                              @change="change"
                              name="radio-options"></b-form-radio-group>
        </b-form-group>
      </template>

      <b-card-text>
        <van-row>
          <van-col offset="1"
                   span="6">
            <b-button variant="primary"
                      @click="backTo">返回</b-button>
          </van-col>
          <van-col offset="10"
                   span="7">
            <b-button variant="success"
                      @click="nextQuestion">下一题</b-button>
          </van-col>
        </van-row>
      </b-card-text>
    </b-card>
    <!-- 题目选项 结束 -->
  </b-container>
</template>
<script>

//导入测试数据
import test from '@/utils/test.js'
import { Toast } from 'vant'
export default {
  name: 'yuhouGameQuestion',
  data () {
    return {
      /**计时器开始才显示选项，计时器停止隐藏选项 */
      hidden: true,
      show: false,//是否显示欢迎答题区域

      //个性化配置
      maxTime: this.$store.getters.getMaxTime,//最大等待猜歌时间，单位，秒
      //累计得分
      countScore: this.$store.getters.getCountScore,
      //答题次数
      countQuestion: this.$store.getters.getCountQuestion,
      //答对次数
      countRight: this.$store.getters.getCountRight,
      //成功答对单题用时，秒
      rightTime: this.$store.getters.getRightTime,
      //成功答题总用时，秒
      countRightTime: this.$store.getters.getCountRightTime,

      //题目
      question: test.getRandomQuestion(),

      //用户选择的答案
      userAnswer: { 'title': test.getRandomSong(), },

      //真实的答案
      answer: test.getRandomSong(),

      //题目答案选项
      selected: -1,
      options: null,
      //提示嘻嘻
      tip: `你将有最多 ${this.$store.getters.getMaxTime} 秒的时间来判断这首歌的信息,超时停止播放，并从中选出一个正确答案，对一个加1分,错一个扣1分`


    }
  },
  mounted () {
    this.options = test.getRandomQuestionItem()
  },
  methods: {
    /**选择了答案 */
    change (value) {
      this.userAnswer.title = value

    },
    /**下一题 */
    nextQuestion () {
      //关闭计时器
      this.$refs.countDown.pause();

      // 隐藏 选项

      //可以使用开始了
      document.getElementById('disabled').removeAttribute('disabled')
      //选择了才可以下一题
      if (this.selected == -1) {
        Toast('你还没有选择')
      } else {
        this.selected = -1
        //检验答题结果
        console.log('答案是:', this.answer);
        console.log('我选择了答案是:', this.userAnswer.title);
        //下一题
        this.options = test.getRandomQuestionItem()
        this.question = test.getRandomQuestion()
        this.answer = test.getRandomSong()
        //重置计时器
        this.$refs.countDown.reset();
        this.judge()
      }

    },
    /** */
    backTo () {
      //重置配置
      this.reflash()
      //调用父组件的返回
      this.$emit('backTo')
    },
    /**重置配置 |  刷新题目 */
    reflash () {
      document.getElementById('disabled').removeAttribute('disabled')
      //重新刷新题目和答案
      this.options = test.getRandomQuestionItem()
      this.question = test.getRandomQuestion()
      this.answer = test.getRandomSong()
    },
    /**定时器相关方法 */
    start () {
      this.$refs.countDown.start();
      //播放歌曲 高潮

      //点过了开始不允许再次点击了
      document.getElementById('disabled').setAttribute('disabled', 'disabled')
    },
    pause () {
      this.$refs.countDown.pause();
    },
    reset () {
      this.$refs.countDown.reset();

      //刷新题目
      this.reflash()
    },
    finish () {
      //可以使用开始了
      document.getElementById('disabled').removeAttribute('disabled')
    },
    /**判断是否正确答案 */
    judge () {
      if (parseInt(Math.random() * 10) < 8) {
        console.log(' 恭喜你 答对了')
        //统计数据
        this.count(true)
      } else {
        this.count(false)
        console.log('答题失败')

      }
    },
    /**统计数据 */
    /**
     * isRight 是否答题正确
     */
    count (isRight) {
      //正确
      if (isRight) {
        //累计得分
        this.$store.commit('setCountScore', this.countScore + 1)
        //答题次数
        this.$store.commit('setCountQuestion')
        //答对次数
        this.$store.commit('setCountRight')
        //成功答对单题用时，秒
        this.$store.commit('setRightTime', parseInt(Math.random() * 1000))
        //成功答题总用时，秒
        this.$store.commit('setCountRightTime', parseInt(Math.random() * 1000))

      } else {
        //累计得分
        this.$store.commit('setCountScore', this.countScore - 1)
        this.$store.commit('setCountQuestion')
      }
      //渲染到页面中去
      //累计得分
      this.countScore = this.$store.getters.getCountScore
      //答题次数
      this.countQuestion = this.$store.getters.getCountQuestion
      //答对次数
      this.countRight = this.$store.getters.getCountRight
      //成功答对单题用时，秒
      this.rightTime = this.$store.getters.getRightTime
      //成功答题总用时，秒
      this.countRightTime = this.$store.getters.getCountRightTime
    },

  }
}
</script>
<style scoped>
.show {
  display: block;
}

.hidden {
  display: none;
}
</style>