import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import 'amfe-flexible'
import {
  NavBar,
  Field,
  Button,
  Form
} from 'vant'
Vue.use(Form);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
