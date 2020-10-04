<template>
  <div>
    <b-container style="margin:50px;padding:10px;">
      <b-row>
        <div class="border border-primary"
             style="margin:10px;padding:10px;">
          <img src="@/assets/img/logo.png"
               alt="">
        </div>
      </b-row>
      <b-row>
        <div class="border border-primary"
             style="margin:10px;padding:10px;">
          <router-link to="/">index</router-link>
        </div>
      </b-row>
      <b-row>
        <div class="border border-info"
             style="margin:10px;padding:10px;">
          <router-link to="/home">home</router-link>
        </div>
      </b-row>
      <b-row>
        <div class="border border-success"
             style="margin:10px;padding:10px;">
          <router-link to="/music">music</router-link>
        </div>
      </b-row>
      <b-row>
        <div class="border border-success"
             style="margin:10px;padding:10px;">
          <router-link to="/test">test</router-link>
        </div>
      </b-row>
      <b-row>
        <router-view></router-view>
      </b-row>
    </b-container>
  </div>
</template>

<script>


export default {
  name: 'index',

}
</script>

<style>
