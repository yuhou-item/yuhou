import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Music from '@/views/Music.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/music',
    name: 'music',
    component: Music
  }
]

const router = new VueRouter({
  routes
})

export default router