<template>
  <div>
    <art-item v-for="item in artList" :key="item.art_id"></art-item>
  </div>
</template>

<script>
import { getArtListAPI } from "../api/HomeApi";
import { loginApi } from "../api/userApi";
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
      preTimestamp: ""
    };
  },
  methods: {
    async getArtList() {
      const { data: res } = await getArtListAPI(this.channelId, Date.now());
      console.log(res);
      if (res.message == "OK") {
        this.preTimestamp = res.data.pre_timestamp;
        this.artList = res.data.results;
        console.log(this.artList,'asdasd');
      }
    }
  },
  created() {
    this.getArtList();
  }
};
</script>

<style lang="less" scoped></style>
