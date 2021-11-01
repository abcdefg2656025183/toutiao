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
  Tabs,
  Cell,
  CellGroup,
  List,
  PullRefresh,
  Lazyload,
  ActionSheet,
  Popup,
  Search 

} from "vant";
// 导入 dayjs 的核心模块
import dayjs from "dayjs";

// 导入计算相对时间的插件
import relativeTime from "dayjs/plugin/relativeTime";

// 导入中文语言包
import zh from "dayjs/locale/zh-cn";
// 配置“计算相对时间”的插件
dayjs.extend(relativeTime);

// 配置中文语言包
dayjs.locale(zh);
Vue.use(Search )
Vue.use(Popup)
Vue.use(TabbarItem);
Vue.use(Tabbar);
Vue.use(Form);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Lazyload);
Vue.use(ActionSheet);
Vue.config.productionTip = false;
Vue.config.silent = true
// dt 参数是文章的发表时间
Vue.filter("dateFormat", dt => {
  // 调用 dayjs() 得到的是当前的时间
  // .to() 方法的返回值，是计算出来的“相对时间”
  return dayjs().to(dt);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
