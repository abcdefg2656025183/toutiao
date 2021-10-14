import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import "amfe-flexible";
import {
  NavBar,
  Field,
  Button,
  Form,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs
} from "vant";
Vue.use(TabbarItem);
Vue.use(Tabbar);
Vue.use(Form);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
