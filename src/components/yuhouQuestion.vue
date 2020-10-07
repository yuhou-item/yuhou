<!--显示题目组件-->
<template>
  <b-container>
    <b-card title="tip"
            header-tag="header"
            footer-tag="footer">
      <template v-slot:header>
        <h6 class="mb-0">
          <van-row>
            <van-col offset="0"
                     span="8">
              <span class="text-success">累计得分:{{countSoure}}</span>
            </van-col>
            <van-col offset="3"
                     span="13">
              <span class="text-primary">段位:{{level}}</span>
            </van-col>
          </van-row>

        </h6>
      </template>
      <b-card-text><em>你将有最多 {{maxTime}} 秒的时间来判断这首歌的信息,超时停止播放，并从中选出一个正确答案，对一个加一分</em></b-card-text>
      <template v-slot:footer>
        <van-container>
          <van-row>
            <van-col offset="10">
              <van-count-down ref="countDown"
                              millisecond
                              :time="maxTime*1000"
                              :auto-start="false"
                              format="ss:SSS"
                              @finish="finish" />
            </van-col>
          </van-row>
          <van-row>
            <van-grid clickable>
              <van-col offset="1"
                       span="6">
                <van-grid-item text="开始播放"
                               icon="play-circle-o"
                               @click="start" />
              </van-col>
              <van-col offset="2"
                       span="6">
                <van-grid-item text="暂停播放"
                               icon="pause-circle-o"
                               @click="pause" />
              </van-col>
              <van-col offset="2"
                       span="6">
                <van-grid-item text="重新播放"
                               icon="replay"
                               @click="reset" />
              </van-col>
            </van-grid>
          </van-row>
        </van-container>
      </template>
    </b-card>
    <b-form-group :label="question">
      <b-form-radio-group id="radio-group-1"
                          stacked
                          v-model="selected"
                          :options="options"
                          name="radio-options"></b-form-radio-group>
    </b-form-group>
    <van-row>
      <van-col offset="1"
               span="6">
        <b-button variant="primary"
                  @click="backTo">返回</b-button>
      </van-col>
      <van-col offset="10"
               span="6">
        <b-button variant="success"
                  @click="nextQuestion">下一题</b-button>
      </van-col>
    </van-row>

  </b-container>
</template>
<script>
export default {
  name: 'yuhouQuestion',
  data () {
    return {
      //个性化配置
      maxTime: 3,//最大等待猜歌时间，单位，秒
      //累计得分
      countSoure: 10,
      //总排名
      level: '鱼猴急先锋',

      //题目
      question: '这首歌是谁唱的?',

      //题目答案选项
      selected: -1,
      options: [
        { text: '猪猪康', value: 0 },
        { text: '猴爽', value: 1 },
        { text: '豪爽', value: 2 },
        { text: '康康', value: 3 }
      ],
    }
  },
  methods: {
    /**下一题 */
    nextQuestion () {
      console.log('下一题');
    },
    /** */
    backTo () {
      console.log('backTo');
    },
    /**定时器相关方法 */
    start () {
      console.log('定时器 start');
      this.$refs.countDown.start();
    },
    pause () {
      console.log('定时器 pause');
      this.$refs.countDown.pause();
    },
    reset () {
      console.log('定时器 reset');
      this.$refs.countDown.reset();
    },
    finish () {
      console.log('定时器 finish');
    },
  },

}
</script>
<style scoped>
</style>