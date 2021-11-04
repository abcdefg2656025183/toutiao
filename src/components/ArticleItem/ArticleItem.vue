<template>
  <div id="article-item" @click="$router.push('/article/'+article.art_id)">
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <!-- <img v-if="article.cover.type === 1" :src="article.cover.images[0]"   alt="" class="thumb"> -->
          <img v-if="article.cover.type === 1" v-lazy="article.cover.images[0]" alt class="thumb" />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type === 3">
          <!-- <img v-for="(imgsrc, index) in article.cover.images" :src="imgsrc" :key="index" alt="" class="thumb"> -->
          <img
            v-for="(imgsrc, index) in article.cover.images"
            v-lazy="imgsrc"
            :key="index"
            alt
            class="thumb"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>作者 {{ article.aut_name }}&nbsp;&nbsp; {{ article.comm_count }}评论 &nbsp;&nbsp; 发布日期 {{ article.pubdate | dateFormat }}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click="show = true"  v-if="closable" />
        </div>
      </template>
    </van-cell>
    <!-- 反馈操作面板 -->
    <van-action-sheet v-model="show" cancel-text="取消" @close="isFirst = true" get-container="body">
      <!-- 一级反馈面板 -->
      <div class="content" v-if="isFirst">
        <van-cell
          :value="item.name"
          v-for="(item,index) in actions"
          @click="onCellClick(item.name)"
          :key="index"
          clickable
        />
      </div>
      <!-- 二级反馈面板 -->
      <div v-else>
        <van-cell
          :value="item.label"
          v-for="item in reports"
          :key="item.type"
          clickable
          @click="handlerReportsArticle(item.type)"
        />
        <van-cell :value="'返回'" clickable @click="isFirst = true" />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from '../../api/reportsAPI'
import { dislikeArticleAPI, reportsArticle } from '../../api/homeAPI'
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    },
    // 是否显示删除图标
    closable: {
      type: Boolean,
      default: true
    }
  },
  // props: ['article', 'closable'],
  data () {
    return {
      show: false,
      actions: [
        { name: '不感兴趣' },
        { name: '反馈垃圾内容' },
        { name: '拉黑作者' }
      ],
      isFirst: true,
      reports
    }
  },
  methods: {
    async onCellClick (name) {
      if (name === '不感兴趣') {
        const { data: res } = await dislikeArticleAPI(this.article.art_id)
        if (res.message === 'OK') {
          this.$emit('removeArticle', this.article.art_id)
        }

        this.show = false
      }

      if (name === '反馈垃圾内容') {
        console.log('反馈垃圾内容')

        this.isFirst = false
      }

      if (name === '拉黑作者') {
        this.show = false
        console.log('拉黑作者')
      }
    },
    async handlerReportsArticle (type) {
      const { data: res } = await reportsArticle(this.article.art_id, type)
      if (res.message === 'OK') {
        this.$emit('removeArticle', this.article.art_id)
        this.show = false
      }
    }
  }
  // created () {
  //   console.log('item里面的结果', this.article)
  // }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}

// .title-center

/deep/ .van-cell__value--alone {
  text-align: center;
}
</style>
