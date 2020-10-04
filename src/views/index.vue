<template>
  <div>
    <YuhouNav></YuhouNav>
    <YuhouFooter></YuhouFooter>
  </div>
</template>

<script>
import YuhouNav from '@/components/yuhouNav.vue'
import YuhouFooter from '@/components/yuhouFooter.vue'
export default {
  name: 'index',
  components: {
    YuhouNav,
    YuhouFooter,
  },

}
</script>

<style>
