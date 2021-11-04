<template>
  <div id="main">
    <!-- 路由占位符 -->
    <router-view></router-view>

    <!-- 底部tarBar -->
      <!-- route 属性：是否开启路由模式 -->
    <van-tabbar route >
      <!-- to 属性：点击后要跳转到的路由地址 -->
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  // name 是当前组件的名称（建议为每个组件都指定唯一的 name 名称）
  // vue devtools
  name: 'Main'

  // created () {
  //   console.log(this.$router)
  // }
}
</script>

<style lang="less" scoped>
</style>
