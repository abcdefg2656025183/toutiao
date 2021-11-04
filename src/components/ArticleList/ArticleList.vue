<template>
  <div id="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多数据了" :immediate-check="false" @load="onLoad">
        <ArticleItem v-for="item in articleList" :key="item.art_id" :article="item" @removeArticle="removeArticle"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI } from '../../api/homeAPI'
import ArticleItem from '../ArticleItem/ArticleItem.vue'
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: 'ArticleList',
  // props属性
  props: {
    channelid: {
      type: Number,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      // 文章列表数据
      articleList: [],
      // 时间戳
      preTimestamp: Date.now(),

      // 代表数据加载完毕了(vant自动的行为)
      loading: false,
      // finished 表示所有数据是否加载完毕
      //    false 表示还有下一页的数据
      //    true  表示所有数据都已加载完毕
      finished: false,
      // 是否在加载中
      isLoading: false
    }
  },
  methods: {
    async initArticleList () {
      const { data: res } = await getArticleListAPI(this.channelid, this.preTimestamp)

      if (res.message === 'OK') {
        this.preTimestamp = res.data.pre_timestamp
        this.articleList = [...this.articleList, ...res.data.results]
        this.loading = false
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
    },
    onLoad () {
      console.log('上拉加载数据触发')
      this.initArticleList()
    },
    onRefresh () {
      console.log('下拉刷新中')
    },
    removeArticle (id) {
      console.log('你要删除的文章ID:', id)
      this.articleList = this.articleList.filter(item => item.art_id !== id)
    }
  },
  created () {
    this.initArticleList()
  }

}
</script>

<style lang="less" scoped>
</style>
