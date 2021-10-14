import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
