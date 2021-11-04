<template>
  <div>
    <!-- Header 头部区域 -->
    <div class="search-header">
      <!-- 后退图标 -->
      <van-icon name="arrow-left" color="white" size="18" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @input="onInput"
      />
    </div>
    <!-- 搜索建议 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div class="sugg-item" v-for="(item, i) in suggestList" :key="i" v-html="item" @click="goSearchResult"></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="history = []" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(tag, i) in history" :key="i">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSuggestListAPI } from '../api/searchAPI'

export default {
  name: 'Search',
  data () {
    return {
      // 搜索关键词
      kw: '',
      // 声明 定时器id
      timeId: '',
      // 搜索建议数据
      suggestList: [],
      // 搜索历史
      history: JSON.parse(localStorage.getItem('history') || '[]')
    }
  },
  methods: {
    onInput () {
      // 清除延时器
      clearTimeout(this.timeId)
      // 如果搜索关键字 为空那么就停止使用延时器
      if (this.kw.length === 0) {
        // 清空搜索建议的列表数据
        this.suggestList = []

        return
      }
      // 添加了延时器
      this.timeId = setTimeout(() => {
        this.initSuggestList()
      }, 500)
    },
    async initSuggestList () {
      const { data: res } = await getSuggestListAPI(this.kw)
      if (res.message === 'OK') {
        // 请求来的数据赋值给搜索列表
        const newHistory = this.history.filter(item => item !== this.kw)

        newHistory.unshift(this.kw)

        this.history = newHistory

        // ["<span>A</span>ngular", "postMessage", "pushState", "koa", "Toast", "localStorage", "webpack", "FormDatah, "canvas"]
        this.hlightKeyWords(res.data.options)

        this.suggestList = res.data.options
      }
    },
    // 高亮搜索关键词
    hlightKeyWords (arr) {
      // console.log(arr)
      if (arr.length !== 0 && arr[0] !== null) {
        const reg = new RegExp(this.kw, 'ig')
        arr.forEach((item, index) => {
          arr[index] = item.replace(reg, val => {
            return `<span style="color: red;font-weight: bold;">${val}</span>`
          })
        })
      };
    },
    // 跳转到搜素结果页面
    goSearchResult (e) {
      // console.log('这是e', e.target.innerText)

      // this.kw = e.target.innerText

      this.$router.push(`/search/${e.currentTarget.innerText}`)
    }
  },
  watch: {
    history (newVal) {
      // 持久化存储到本地
      localStorage.setItem('history', JSON.stringify(newVal))
    }
  },
  // 挂载后 操作DOM
  mounted () {
    const ipt = document.querySelector('input[type=search]')
    ipt && ipt.focus()
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  // 后退按钮
  .goback {
    padding-left: 14px;
  }
  // 搜索组件
  .van-search {
    flex: 1;
  }
}

.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>

<!-- computed -->
<!-- 2.computed 必须return值 -->
<!-- 3.computed 会缓存计算值 -->
<!-- 4.computed 同步计算 -->
<!-- 5.computed计算属性名 不能和data中的对象的键一致 -->
<!-- 6.computed中有两个方法 getter 和 setter，既可以赋值也可以被赋值 -->
<!-- 7.computed的设计思想是 多个数据影响一个数据-->
<!-- watch -->
<!-- 2.不需要返回值 -->
<!-- 3.watch不会缓存 -->
<!-- 4.watch可以进行异步任务 -->
<!-- 5.watch监听的属性必须在data中定义 -->
<!-- 6.watch只能是监听某一个属性 -->
<!-- 7.watch的设计思想: 一个数据影响多个数据 -->
<!-- 8. immediate -->
<!-- 9. deep -->
