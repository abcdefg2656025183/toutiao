<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ article.title }}</span>
          <!-- 单张图片 -->
          <img
            v-if="article.cover.type == 1"
            v-lazy="article.cover.images[0]"
            alt=""
            class="thumb"
          />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="article.cover.type > 1">
          <img v-lazy="article.cover.images[0]" alt="" class="thumb" />
          <img v-lazy="article.cover.images[1]" alt="" class="thumb" />
          <img v-lazy="article.cover.images[2]" alt="" class="thumb" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span
            >{{ article.aut_name }} &nbsp;&nbsp; {{ article.comm_count }}评论
            &nbsp;&nbsp; {{ article.pubdate | dateFormat }}</span
          >
          <!-- 关闭按钮 -->
          <van-icon name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>

    <!-- 反馈的动作面板 -->
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :closeable="false"
      @closed="isFirst = true"
      get-container="body"
    >
      <div v-if="isFirst">
        <!-- 循环渲染可选项 -->
        <van-cell
          :title="item.name"
          clickable
          class="center-title"
          v-for="item in actions"
          :key="item.name"
          @click="onCellClick(item.name)"
        />
      </div>

      <div v-else>
        <van-cell
          :title="item.label"
          clickable
          title-class="center-title"
          v-for="item in reports"
          :key="item.type"
          @click="reportArticle(item.type)"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from "../api/reports";
import { dislikeArticleAPI, reportArticleAPI } from "../api/HomeApi";
export default {
  name: "ArtItem",
  data() {
    return {
      reports,
      // loading 表示是否正在进行上拉加载的请求
      //   每当触发 List 组件的上拉加载更多时，List 组件会自动把 loading 设为 true
      //   每当下一页的数据请求回来以后，需要程序员手动的把 loading 设为 false，
      //   否则：再次触发上拉加载更多时，不会发起请求！！
      loading: false,

      // finished 表示所有数据是否加载完毕
      //    false 表示还有下一页的数据
      //    true  表示所有数据都已加载完毕
      finished: false,
      show: false,
      actions: [
        { name: "不感兴趣" },
        { name: "反馈垃圾内容" },
        { name: "拉黑作者" }
      ],
      isFirst: true
    };
  },
  props: {
    // 文章的信息对象
    article: {
      type: Object, // 数据类型
      required: true // 必填项
    }
  },
  created() {
    // console.log(this.reports);
  },
  methods: {
    async onCellClick(name) {
      if (name === "不感兴趣") {
        // console.log("不感兴趣");
        // console.log(this.artId);
        const { data: res } = await dislikeArticleAPI(this.artId);
        console.log(res, "res");
        if (res.message === "OK") {
          this.$emit("remove-article", this.artId);
        }
        this.show = false;
      } else if (name === "拉黑作者") {
        console.log("拉黑作者");
        this.show = false;
      } else if (name === "反馈垃圾内容") {
        this.isFirst = false;
      }
    },
    async reportArticle(type) {
      const { data: res } = await reportArticleAPI(this.artId, type);
      if (res.message === "OK") {
        this.$emit("remove-article", this.artId);
      }

      this.show = false;
    }
  },
  computed: {
    artId() {
      return this.article.art_id.toString();
    }
  }
};
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
.center-title {
  text-align: center;
}
</style>
