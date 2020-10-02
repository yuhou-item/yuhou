import Vue from 'vue'
import App from '@/pages/index.vue'
import router from '@/router'
import store from '@/store'
import vConsole from 'vconsole'
Vue.prototype.$vConsole = new vConsole()
Vue.config.productionTip = false
import {
  Swipe,
  SwipeItem,
  Lazyload
} from 'vant'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')