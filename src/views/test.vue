<template>
  <div>
    <YuhouNav></YuhouNav>
    <YuhouFooter></YuhouFooter>
    <YuhouBack></YuhouBack>
  </div>
</template>

<script>

import YuhouBack from '@/components/yuhouBack.vue'
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
const MiniApp = window.MiniApp
export default {
  name: 'test',
  data () {
    return {
    };
  },
  components: {
    YuhouFooter,
    YuhouNav,
    YuhouBack,
  },
}
</script>

<style lang="css" scoped>
.main {
  margin-top: 50px;
}
.m-text {
  text-align: center;
  font-size: x-large;
  font-weight: bolder;
  color: aqua;
}
</style>