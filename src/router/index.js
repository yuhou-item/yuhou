import Vue from 'vue'
import VueRouter from 'vue-router'


const MiniApp = window.MiniApp
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('@/views/music.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue')
  },
  //下面是其他共用的组件
  {
    path: '/yuhouFooter',
    name: 'yuhouFooter',
    component: () => import('@/components/yuhouFooter.vue')
  },
  {
    path: '/yuhouIndex',
    name: 'yuhouIndex',
    component: () => import('@/components/yuhouIndex.vue')
  },
]

const router = new VueRouter({
  routes,
})
// 路由离开生命周期函数
router.afterEach((to, from, next) => {
  // 即将跳转的路由地址
  if (from.path == '/home') { //说明退出 home 界面，停止播放
    //初始化 播放器 并获取播放器实例
    MusicPlayer = MiniApp.createMusicPlayer({
      isInner: true
    })
    MusicPlayer.stop()
    next();
  }
})

export default router