<template>
  <div>
    <YuhouFooter></YuhouFooter>
  </div>

</template>

<script>

import YuhouFooter from '@/components/yuhouFooter.vue'
const MiniApp = window.MiniApp
export default {
  name: 'test',
  components: {
    YuhouFooter
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