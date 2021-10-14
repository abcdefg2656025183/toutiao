<template>
  <div>文章列表组件 ---{{ channelId }}</div>
</template>

<script>
import { getArtListAPI } from "../api/HomeApi";
export default {
  // 大驼峰命名法：每个单词的首字母大写
  name: "ArticleList",
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      artList: [],
      time: Date.now()
    };
  },
  methods: {
    async getArtList() {
        console.log(this.channelId);
      const { data: res } = await getArtListAPI({
        channel_id: this.channelId,
        timestamp: this.time
      });
      console.log(res);
    }
  },
  created () {
    this.getArtList()  
  }
};
</script>

<style lang="less" scoped></style>
