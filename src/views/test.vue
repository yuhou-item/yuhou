<template>
  <div>
    <YuhouFooter></YuhouFooter>
  </div>
</template>

<script>
//初始化 miniapp 注入sdk
const MiniApp = window.MiniApp;
//导入 与播放器有关的方法
import player from "@/utils/player.js";

import YuhouFooter from "@/components/yuhouFooter.vue";
export default {
  name: "test",
  data() {
    return {
      preTime: 0,
      exitListener: null,
    };
  },
  components: {
    YuhouFooter,
  },
  created() {},
  mounted() {
    if (window.history && window.history.pushState) {
      // 按需使用：在页面一进来的时候，添加一个历史记录，popstate不可修改
      // pushState带有三个参数：一个状态对象，一个标题（现在被忽略了），以及一个可选的URL地址。
      history.pushState(null, null, document.URL);
      // 给 window 添加一个 popstate 事件，拦截返回键，执行 this.rtnBack() 事件
      window.addEventListener("popstate", this.rtnBack, false); //false阻止默认事件
    }
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.rtnBack, false);
  },
  methods: {
    rtnBack() {
      if (this.preTime === 0) {
        this.preTime = new Date().getTime();
        MiniApp.showToast({ title: "再按一次退出应用" });
        setTimeout(() => {
          this.preTime = 0;
        }, 3000);
      } else if (new Date().getTime() - this.preTime < 3000) {
        MiniApp.exitMiniApp();
      }
    },
  },
};
</script>

<style>
.main {
  margin-top: 0;
}
#back {
  margin-top: 5vh;
}
.m-text {
  text-align: center;
  font-size: x-large;
  font-weight: bolder;
  color: aqua;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>
