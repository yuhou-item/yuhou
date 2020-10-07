<template>
  <div>
    <YuhouFooter></YuhouFooter>
    <YuhouBack></YuhouBack>
  </div>
</template>

<script>
import YuhouBack from '@/components/yuhouBack.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
export default {
  name: 'index',
  components: {
    YuhouFooter,
    YuhouBack,
  },
  mounted () {
    document.title = '鱼猴大本营'
  },

}
</script>

<style>
