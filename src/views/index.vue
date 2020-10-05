<template>
  <div>
    <YuhouFooter></YuhouFooter>
  </div>
</template>

<script>
import YuhouFooter from '@/components/yuhouFooter.vue'
export default {
  name: 'index',
  components: {
    YuhouFooter,
  },
  mounted () {
    document.title = '鱼猴大本营'
  },

}
</script>

<style>
