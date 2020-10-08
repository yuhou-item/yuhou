import Vue from 'vue'
import VueRouter from 'vue-router'


const MiniApp = window.MiniApp
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '鱼猴大本营'
    },
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('@/views/music.vue'),
    meta: {
      title: 'music'
    },
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/game.vue'),
    meta: {
      title: '听歌猜曲游戏'
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页'
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue'),
    meta: {
      title: '测试'
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user.vue'),
    meta: {
      title: '设置'
    },
  },
  //下面是其他共用的组件
  {
    path: '/yuhouFooter',
    name: 'yuhouFooter',
    component: () => import('@/components/yuhouFooter.vue'),
    meta: {
      title: 'yuhou'
    },
  },
  //
  {
    path: '/yuhouIndex',
    name: 'yuhouIndex',
    component: () => import('@/components/yuhouIndex.vue'),
    meta: {
      title: 'yuhou'
    },
  },
  //搜歌组件
  {
    path: '/yuhouSearchSong',
    name: 'yuhouSearchSong',
    component: () => import('@/components/yuhouSearchSong.vue'),
    meta: {
      title: 'yuhou'
    },
  },

  //鱼猴 检测返回组件 yuhouQuestion
  {
    path: '/yuhouBack',
    name: 'yuhouBack',
    component: () => import('@/components/yuhouBack.vue'),
  },
  //鱼猴 题目组件 yuhouQuestion
  {
    path: '/yuhouGameQuestion',
    name: 'yuhouGameQuestion',
    component: () => import('@/components/yuhouGameQuestion.vue'),
  },
  //鱼猴 答题介绍组件 yuhouGameIntroduction
  {
    path: '/yuhouGameIntroduction',
    name: 'yuhouGameIntroduction',
    component: () => import('@/components/yuhouGameIntroduction.vue'),
  },
  //鱼猴 选择答题的类型组件 yuhouGameSelectItem
  {
    path: '/yuhouGameSelectItem',
    name: 'yuhouGameSelectItem',
    component: () => import('@/components/yuhouGameSelectItem.vue'),
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
    const MusicPlayer = MiniApp.createMusicPlayer({
      isInner: true
    })
    //停止播放
    MusicPlayer.stop()
  }
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();

})

export default router