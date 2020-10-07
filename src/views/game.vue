<template>
  <b-container>
    <YuhouNav :navTitle="navTitle"> </YuhouNav>
    <!-- 1 答题介绍开始 -->
    <b-container>
      <div :class="{'show':show,'hidden':hidden}">
        <b-card title="欢迎来到听歌猜曲"
                text-variant="info"
                border-variant="primary"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <b-card-text>
            <van-notice-bar wrapable
                            :scrollable="false"
                            text="在这里，你可以选择多种多样的歌曲类型进行猜测，猜一猜，让大家知道谁才是金曲小王子（小仙女）" />
          </b-card-text>

          <b-button variant="primary"
                    @click="go">Go !</b-button>
        </b-card>
      </div>
    </b-container>
    <!-- 1 答题介绍结束 -->

    <!-- 2 选择题型 开始 -->
    <b-container :class="{'show':selectShow,'hidden':selectHidden}">
      <van-row>

        <b-card-group deck>
          <b-card border-variant="primary"
                  header="Primary"
                  header-bg-variant="primary"
                  header-text-variant="white"
                  align="center">
            <b-card-text>

              <van-row>
                <van-col offset="0"
                         span="12">
                  <van-divider content-position="left"
                               :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
                    选择类型
                  </van-divider>
                </van-col>

                <van-dropdown-menu active-color="#1989fa">
                  <van-dropdown-item v-model="value1"
                                     :options="option1" />
                </van-dropdown-menu>
              </van-row>
              <van-row>
                <van-col offset="0"
                         span="12">
                  <van-divider content-position="left"
                               :style="{ color: '#66ffff', borderColor: '#1989fa', padding: '0 16px' }">
                    选择类型
                  </van-divider>
                </van-col>
                <van-dropdown-menu active-color="#1989fa">
                  <van-dropdown-item v-model="value2"
                                     :options="option2" />
                </van-dropdown-menu>
              </van-row>

            </b-card-text>
          </b-card>
        </b-card-group>
      </van-row>
      <van-row>
        <b-jumbotron>
          <van-row>
            <van-col offset="0">
              <b-button variant="primary"
                        @click="reset">还没选择好？</b-button>
            </van-col>
            <van-col offset="2">
              <b-button variant="success"
                        @click="reading">I'm reading!</b-button>
            </van-col>
          </van-row>
        </b-jumbotron>
      </van-row>
    </b-container>
    <!-- 2 选择题型 结束 -->

    <!-- 3 显示题目区域 开始 -->
    <YuhouQuestion :class="{'show':questionShow,'hidden':questionHidden}"></YuhouQuestion>
    <!-- 3 显示题目区域 结束-->

    <!--  答题区域-->

    <!--  提交区域-->

    <!--  答题结果区域-->

    <YuhouFooter></YuhouFooter>
    <YuhouBack></YuhouBack>
  </b-container>

</template>

<script>
import YuhouBack from '@/components/yuhouBack.vue'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
import YuhouQuestion from '@/components/yuhouQuestion.vue'
import player from '@/utils/player.js'
import utils from '@/utils/utils.js'
import system from '@/utils/system.js'
import entity from '@/utils/entity.js'
const MiniApp = window.MiniApp
export default {
  name: 'game',
  components: {
    YuhouNav,
    YuhouFooter,
    YuhouBack,
    YuhouQuestion,
  },
  data () {
    return {
      //下拉框，选题型
      value1: 0,//默认值
      value2: 2,//默认值
      option1: [
        { text: '单曲', value: 0 },
        { text: 'mv', value: 1 },
        { text: '有声读物', value: 2 },
      ],
      option2: [
        { text: '安静风格', value: 0 },
        { text: '热烈风格', value: 1 },
        { text: '爱情风格', value: 2 },
      ],

      MusicPlayer: null,
      hidden: false,
      show: true,//是否显示欢迎答题区域
      selectHidden: true,
      selectShow: false,
      questionHidden: true,
      questionShow: false,
      navTitle: '听歌猜曲',//传递给子组件的标题

    }
  },
  mounted () {
    this.MusicPlayer = MiniApp.createMusicPlayer({ isInner: true })
  },
  methods: {
    /**开始游戏 */
    go () {
      //隐藏答题欢迎界面
      this.show = false
      this.hidden = true
      //展示选择题型界面
      this.selectShow = true
      this.selectHidden = false
    },
    /**重置选项 */
    reset () {

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