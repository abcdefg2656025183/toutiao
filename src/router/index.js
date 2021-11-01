import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Search from "../views/Search.vue";
import SearchResult from "../views/SearchResult.vue";
import ArticleDetail from "../views/ArticleDetail.vue";

Vue.use(VueRouter);
//路由表
const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/",
    component: Main,
    // name: "Main",
    children: [
      {
        path: "",
        component: Home,
        name: ""
      },
      {
        path: "/user",
        component: User,
        name: "User"
      }
    ]
  },
  { path: "/search", component: Search, name: "search" },
  { path: '/search/:kw', component: SearchResult, name: 'search-result', props: true },
  { path: '/article/:id', component: ArticleDetail, name: 'art-detail' ,props: true}

];

const router = new VueRouter({
  routes
});

export default router;
