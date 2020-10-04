<template>
  <div class="main">
    <b-row>
      <b-container style="margin-top:50px;">
        <router-link to="/"
                     class="m-text">back</router-link>
      </b-container>
    </b-row>
    <b-row>
      <router-view></router-view>
    </b-row>
  </div>

</template>

<script>


const MiniApp = window.MiniApp
export default {
  name: 'test',
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