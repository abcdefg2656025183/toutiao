<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <art-item
          v-for="item in artList"
          :key="item.art_id"
          :article="item"
        ></art-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from "../api/HomeApi";
import ArtItem from "../components/ArtItem.vue";

export default {
  components: {
    ArtItem
  },
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
      preTimestamp: "",
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      isLoading: false
    };
  },
  methods: {
    async initArtList(isRefresh) {
      const { data: res } = await getArtListAPI(this.channelId, this.timestamp);
      // console.log(res);
      if (res.message == "OK") {
        this.timestamp = res.data.pre_timestamp;
        this.artList = [...this.artList, ...res.data.results];
        this.loading = false;
        if (isRefresh) {
          // 下拉刷新
          // 1. “新数据”在前，“旧数据”在后
          this.artList = [...res.data.results, ...this.artList];
          // 2. 重置 isLoading 为 false
          this.isLoading = false;
        } else {
          // 上拉加载
          // 1. “旧数据”在前，“新数据”在后
          this.artlist = [...this.artlist, ...res.data.results];
          // 2. 重置 loading 为 false
          this.loading = false;
        }
      }
      if (res.data.pre_timestamp === null) {
        this.finished = true;
      }
    },
    onLoad() {
      // console.log("触发了上拉加载更多");
      this.initArtList();
    },
    onRefresh() {
      this.initArtList(true);
    }
  },
  created() {
    this.initArtList();
  }
};
</script>

<style lang="less" scoped></style>
