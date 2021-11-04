import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入Login.vue页面组件
import Login from '@/views/Login'
// 导入Main.vue页面组件
import Main from '@/views/Main'
// 导入Home.vue页面组件
import Home from '@/views/Home'
// 导入User.vue页面组件
import User from '@/views/User'
// 导入Search.vue页面组件
import Search from '@/views/Search'
// 导入SearchResult.vue页面组件
import SearchResult from '@/views/SearchResult'
// 导入 articleDetail页面组件
import ArticleDetail from '@/views/ArticleDetail'
// 导入 UserEdit 页面组件
import UserEdit from '@/views/UserEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    component: Main,
    // 为什么要删除还有子路由的父路由的名字
    // 含有子路由的路由 有默认的路由，不能加命名路由
    // name: 'main',
    children: [
      {
        path: '/',
        component: Home,
        name: 'home'
      },
      {
        path: '/user',
        component: User,
        name: 'user'
      },

      {
        path: '/search',
        component: Search,
        name: 'search'
      },

      { path: '/search/:kw', component: SearchResult, name: 'search-result', props: true }

    ]
  },
  { path: '/article/:id', component: ArticleDetail, name: 'article-detail', props: true },
  { path: '/user/edit', component: UserEdit, name: 'user-edit' }
]

const router = new VueRouter({
  routes
})

export default router
