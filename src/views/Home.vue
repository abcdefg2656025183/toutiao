<template>
  <div class="home-container" sticky>
    <!-- 头部区域 -->
    <van-nav-bar fixed sticky>
      <!-- 左侧的插槽 -->
      <template #left>
        <img src="../assets/toutiao_logo.png" alt="logo" class="logo" />
      </template>
      <!-- 右侧的插槽 -->
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" sticky>
      <!-- 频道列表的标签页 -->
      <!-- <van-tabs v-model="active" sticky offset-top="1.22666667rem"></van-tabs> -->

      <van-tab :title="item.name" v-for="item in userChannel" :key="item.id">
        <art-list :channel-id="item.id"></art-list>
      </van-tab>
    </van-tabs>
    <van-icon name="plus" size="16" class="plus" @click="show = true" />

    <van-popup
      v-model="show"
      :close-on-click-overlay="false"
      @closed="isDel = false"
    >
      <div class="popup-container">
        <!-- 弹出层的头部区域 -->
        <van-nav-bar title="频道管理">
          <template #right>
            <van-icon
              name="cross"
              size="14"
              color="white"
              @click="show = false"
            />
          </template>
        </van-nav-bar>

        <!-- 弹出层的主体区域 -->
        <div class="pop-body">
          <!-- 我的频道 -->
          <div class="my-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">已添加频道：</span>
                <!-- 提示的文本 -->
                <span class="title-gray">{{
                  isDel ? "点击移除频道" : "点击进入频道"
                }}</span>
              </div>
              <!-- 按钮的文本 -->
              <span class="btn-edit" @click="isDel = !isDel">{{
                isDel ? "完成" : "编辑"
              }}</span>
            </div>
            <!-- 我的频道列表 -->
            <van-row type="flex">
              <!-- 1. 在进行 v-for 循环时，接收索引 index -->
              <van-col
                span="6"
                v-for="(item, index) in userChannel"
                :key="item.id"
              >
                <!-- 2. 点击用户频道的 Item 项时，将索引 index 作为参数，传递给 onUserChannelClick 方法 -->
                <div
                  class="channel-item van-hairline--surround"
                  @click="onUserChannelClick(item, index)"
                >
                  {{ item.name }}
                  <!-- 删除的图标 -->
                </div>
              </van-col>
            </van-row>
          </div>

          <!-- 分隔线 -->
          <div class="van-hairline--top sp-line"></div>

          <!-- 更多频道 -->
          <div class="more-channel-box">
            <div class="channel-title">
              <div class="a">
                <span class="title-bold">可添加频道：</span>
                <span class="title-gray">点击添加频道</span>
              </div>
            </div>
            <!-- 更多频道列表 -->
            <!-- 更多频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="item in moreChannels" :key="item.id">
                <div
                  class="channel-item van-hairline--surround"
                  @click="addChannel(item)"
                >
                  {{ item.name }}
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  getUserChannels,
  getAllChannelAPI,
  updateUserChannelAPI
} from "../api/HomeApi";
import ArtList from "../components/Artlist.vue";

export default {
  name: "Home",
  components: {
    ArtList
  },
  data() {
    return {
      active: 0,
      userChannel: [],
      show: false,
      allChannel: [],
      isDel: false
    };
  },
  methods: {
    async initUserChannel() {
      const { data: res } = await getUserChannels();
      // console.log(res);
      if (res.message === "OK") {
        this.userChannel = res.data.channels;
      }
    },
    async initAllChannel() {
      const { data: res } = await getAllChannelAPI();
      if (res.message === "OK") {
        // 将请求到的数据，转存到 allChannel 中
        this.allChannel = res.data.channels;
      }
    },
    addChannel(item) {
      this.userChannel.push(item);
      // 调用 updateChannel 方法，把最新的频道列表数据提交到后端保存
      this.updateChannel();
    },
    async updateChannel(item) {
      // 1. 准备要提交到服务器的数据
      const channels = this.userChannel
        .filter(item => item.name !== "推荐") // 将“推荐”从频道列表中过滤出去
        .map((item, index) => {
          // 调用数组的 map 循环，最终返回一个处理好的新数组
          return {
            id: item.id,
            seq: index + 1
          };
        });

      // 2. 调用 API 接口
      const { data: res } = await updateUserChannelAPI(channels);
      if (res.message === "OK") {
        // 3. 通过 notify 弹框提示用户更新成功
        this.$notify({ type: "success", message: "更新成功", duration: 1000 });
      }
    },
    onUserChannelClick(channel, index) {
      if (this.isDel) {
        // 处于删除状态

        if (channel.name === "推荐" || this.userChannel.length === 2) return;
        // 进行数组的过滤
        this.userChannel = this.userChannel.filter(
          item => item.id !== channel.id
        );
        // 将更改过后的用户频道数据，提交到服务器保存
        this.updateChannel();
      } else {
        // 不处于删除状态

        // 1. 修改 Tabs 的激活项的索引值
        this.active = index;
        // 2. 关闭 popup 弹出层
        this.show = false;
      }
    },
    removeChannel(channel) {
      if (this.isDel) {
        // 处于删除状态
        // 判断用户点击的是否为“推荐”
        if (channel.name === "推荐") return;

        // 移除频道
        this.userChannel = this.userChannel.filter(
          item => item.id !== channel.id
        );
        this.updateChannel();
      } else {
        // 不处于删除状态
      }
    }
  },
  computed: {
    moreChannels() {
      // 1. 对数组进行 filter 过滤，返回的是符合条件的新数组
      return this.allChannel.filter(item => {
        // 判断当前循环项，是否在 “我的频道” 列表之中
        const index = this.userChannel.findIndex(x => x.id === item.id);
        // 如果不在，则 return true，表示需要把这一项存储到返回的新数组之中
        if (index === -1) return true;
      });
    }
  },
  created() {
    this.initUserChannel();
    this.initAllChannel();
  }
};
</script>

<style lang="less" scoped>
// 组件外层容器的样式
.home-container {
  padding-top: 46px;
  padding-bottom: 50px;
}
// logo 样式
.logo {
  height: 80%;
}
// 为 tabs 容器设置右 padding
/deep/ .van-tabs__wrap {
  padding-right: 36px;
  background-color: white;
}
// 频道管理小图标的定位
.plus {
  position: fixed;
  top: 58px;
  right: 10px;
  z-index: 999;
}
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    font-size: 0.37333rem;
    line-height: 0.74667rem;
    padding: 0 0.16rem;
    justify-content: space-between;
    flex-wrap: nowrap;

    .title-bold {
      font-weight: bold;
    }
    .title-gray {
      color: gray;
      font-size: 12px;
    }
  }
}

.btn-edit {
  border: 1px solid #a3a2a2;
  padding: 0 10px;
  line-height: 20px;
  height: 20px;
  border-radius: 6px;
  font-size: 12px;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 6px;
  width: 20%;
  float: left;
}

.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

.sp-line {
  margin: 10px 0 20px 0;
}
</style>
