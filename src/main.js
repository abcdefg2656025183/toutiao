import Vue from 'vue'
import App from './App.vue'
import router from './router/routera'
import store from './store'

// #region 配置amfe-flexible
import 'amfe-flexible'
// #endregion
// #region 配置Vant
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.less'
// #endregion
// #region 配置day.js

// 引入dayjs
import dayjs from 'dayjs'
// 引入 相对日期 插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入中文语言包
import zh from 'dayjs/locale/zh-cn'
// import './index.less'
// 关掉 控制台中的 '请使用production版本的vue'的提示
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Lazyload)
// 把相对日期插件 挂dayjs
dayjs.extend(relativeTime)
// 导入中文语言包
dayjs.locale(zh)

Vue.filter('dateFormat', dt => {
  return dayjs().to(dt)
})
// #endregion
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
