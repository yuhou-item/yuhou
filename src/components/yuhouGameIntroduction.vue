<!--显示答题介绍组件-->
<template>
  <b-container>
    <div>
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
</template>
<script>
export default {
  name: 'yuhouGameIntroduction',
  data () {
    return {

    }
  },
  methods: {
    go(){
      //执行父组件传递过来的方法
      this.$emit('go')
    }
  },

}
</script>
<style scoped>
</style>