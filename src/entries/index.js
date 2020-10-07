import Vue from 'vue'
import App from '@/pages/index.vue'
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false


// 引入 vconsole
import vConsole from 'vconsole'
Vue.prototype.$vConsole = new vConsole()




//引入 Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

/*
// 引入 MUI （@表示 src 文件夹）
import mui from '@/assets/mui/mui.min.js'
import '@/assets/mui/mui.min.css'
// 挂载到VUE实例上
Vue.prototype.$mui = mui
*/

/*
//引入 ant
import '@/assets/ant/antui.js'
import '@/assets/ant/antui.css'
import '@/assets/ant/search.css'
*/


//引入 layui
/*
import layui from '@/assets/layui/layui.all.js'
import '@/assets/layui/css/layui.css'
*/



//引入 bootstrap vue
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#root')