<template>
  <div id="home">
    <!-- 头部区域 -->
    <van-nav-bar fixed>
      <!-- 左侧的插槽 -->
      <template #left>
        <img src="../assets/toutiao_logo.png" alt="logo" class="logo" />
      </template>
      <!-- 右侧的插槽 -->
      <template #right>
        <van-icon name="search" color="white" size="18" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" sticky offset-top="46px">
      <van-tab :title="item.name" v-for="item in userChannel" :key="item.id">
        <ArticleList :channelid="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 频道管理的小图标 -->
    <van-icon name="plus" size="16" class="plus" @click="show = true" />
    <!-- 频道管理的弹出层 -->
    <van-popup v-model="show" :close-on-click-overlay="false" @closed="isDel = false">
      <div class="popup-container">
        <!-- 弹出层的头部区域 -->
        <van-nav-bar title="频道管理">
          <template #right>
            <van-icon name="cross" size="14" color="white" @click="show = false" />
          </template>
        </van-nav-bar>

        <!-- 弹出层的主体区域 -->
        <div class="pop-body">
          <!-- 我的频道 -->
          <div class="my-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">已添加频道：</span>
                <span class="title-gray">{{ isDel ? '点击移除频道' : '点击进入频道' }}</span>
              </div>
              <span class="btn-edit" @click="isDel = !isDel">{{ isDel ? '完成' : '编辑' }}</span>
            </div>
            <!-- 我的频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="(item, index) in userChannel" :key="item.id">
                <!-- 用户的频道 Item 项 -->
                <div class="channel-item van-hairline--surround" @click="onUserChannelClick(item,index)">
                  {{ item.name }}
                  <van-badge color="transparent" class="cross-badge" v-if="isDel && item.name !=='推荐'&& userChannel.length > 2 ">
                    <template #content>
                      <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="12" />
                    </template>
                  </van-badge>
                </div>
              </van-col>
            </van-row>
          </div>

          <!-- 分隔线 -->
          <div class="van-hairline--top sp-line"></div>

          <!-- 更多频道 -->
          <div class="more-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">可添加频道：</span>
                <span class="title-gray">点击添加频道</span>
              </div>
            </div>
            <!-- 更多频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="item in moreChannels" :key="item.id">
                <div
                  class="channel-item van-hairline--surround"
                  @click="addChannel(item)"
                >{{ item.name }}</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// 按需导入 请求接口
import { getUserChannelAPI, getAllChannelAPI, updateUserChannelAPI } from '../api/homeAPI'

// 导入文章列表组件
import ArticleList from '../components/ArticleList/ArticleList.vue'

export default {
  // name 是当前组件的名称（建议为每个组件都指定唯一的 name 名称）
  // vue devtools
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      userChannel: [],
      allChannel: [],
      show: false,
      isDel: false
    }
  },
  computed: {
    moreChannels () {
      // 1.遍历 all channels
      return this.allChannel.filter(item => {
        // 遍历all channel中的每一个 频道
        // 在userChannel中找一下 这个频道在不在这个 userChannl中
        const index = this.userChannel.findIndex(x => x.id === item.id)
        if (index === -1) {
          // 如果不在 那么就把这个频道返回
          return true
        }
      })
    }
  },
  methods: {
    // 初始化 我的(用户) 频道
    async initUserChannel () {
      const { data: res } = await getUserChannelAPI()
      this.userChannel = res.data.channels
    },

    // 初始化  所有 频道
    async initAllChannel () {
      const { data: res } = await getAllChannelAPI()
      if (res.message === 'OK') {
        this.allChannel = res.data.channels
      }
    },
    // 更新用户频道
    async updateUserChannel () {
    // 遍历用户频道  对每一个对象进行操作
      const channels = this.userChannel.filter(item => item.name !== '推荐').map((item, index) => {
        return {
          id: item.id,
          seq: index + 1
        }
      })

      // 看 channels = {id:  seq:}
      // console.log(channels)
      // console.log('用户频道', this.userChannel)

      const { data: res } = await updateUserChannelAPI(channels)

      if (res.message === 'OK') {
      // console.log(res)
        this.$notify({ type: 'success', message: '更新成功', duration: 1000 })
      }
    },

    // 添加频道
    addChannel (item) {
      this.userChannel.push(item)
      // 定义一个方法 专门用于 更新用户频道
      this.updateUserChannel()
    },
    // 移除 用户的 频道
    onUserChannelClick (item, index) {
      if (this.isDel) {
      // console.log(item)
        if (item.name === '推荐' || this.userChannel.length <= 2) return

        this.userChannel = this.userChannel.filter(x => x.id !== item.id)

        // 定义一个方法 专门用于 更新用户频道
        this.updateUserChannel()
      } else {
        // console.log(index)
        this.active = index
        this.show = false
      }
    }
  },
  created () {
    this.initUserChannel()
    this.initAllChannel()
  }
}
</script>

<style lang="less" scoped>
#home {
  padding-top: 46px;
  padding-bottom: 50px;
  .logo {
    height: 80%;
  }
}

// scoped 给在该style标签中的 类名添加 自定义属性
// /deep/ 谁有 /deep/ 就不让vue 添加自定义属性在标签中
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
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
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

  cursor: pointer;
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 6px;
  cursor: pointer;
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
