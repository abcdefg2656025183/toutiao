import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

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

// 1. 将 VueRouter 本身提供的 $router.push 方法转存到常量中
const originalPush = VueRouter.prototype.push
// 2. 自定义 $router.push 方法，在内部调用原生的 originalPush 方法进行路由跳转；并通过 .catch 捕获错误
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  // 通过 .catch 捕获错误
  return originalPush.call(this, location).catch(err => err)
}

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

// 前置路由守卫

router.beforeEach((to, from, next) => {
  // 判断 用户如果访问 用户(/user) 和 用户编辑(/user/edit);
  if (to.path === '/user' || to.path === '/user/edit') {
    // 判断用户是否登录
    const token = store.state.tokenInfo.token
    console.log(token)
    if (token) {
      // 如果登录 那么放行
      // console.log('方形')
      next()
    } else {
      // 如果没有登录 强制跳转到 登录页
      next(`/login?url=${to.fullPath}`)
    }
    next()
  } else {
    // 在黑马头条项目中，只有 用户和用户编辑 这两个页面要求只有登录过的用户才可以访问
    next()
  }
})

// 后置路由守卫

export default router
