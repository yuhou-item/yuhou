<!--显示答题介绍组件-->
<template>
  <b-container>
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
</template>
<script>
export default {
  name: 'yuhouGameSelectItem',
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
    }
  },
  methods: {
    /**重置选项 */
    reset () {

    },
    reading () {
      //执行父组件的方法
      this.$emit('reading')
    }
  },

}
</script>
<style scoped>
</style>