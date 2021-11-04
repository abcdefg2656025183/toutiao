<template>
  <div :class="isShowBox1 ? 'art-cmt-container-1' : 'art-cmt-container-2'">
    <!-- 评论列表 -->
    <div class="cmt-list">
      <!-- 评论的 Item 项 -->

      <van-list
        class="cmt-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多评论了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="cmt-item" v-for="item in cmtList" :key="item.id">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img src alt class="avatar" />
              <span class="uname">{{ item.aut_name }}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon
                name="like"
                size="16"
                color="red"
                @click="delLike(item)"
                v-if="item.is_liking"
              />
              <van-icon name="like-o" size="16" color="gray" @click="addLike(item)" v-else />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">{{ item.content }}</div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{ item.pubdate | dateFormat }}</div>
        </div>
      </van-list>
    </div>
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShowBox1">
      <van-icon name="arrow-left" size="18" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="showBox2">发表评论</div>
      <div class="icon-box">
        <van-badge :content="cmtCount" :max="99"  >
          <van-icon name="comment-o" size="20" @click="scrollToCmtList" />
        </van-badge>
        <van-icon name="star-o" size="20" />
        <van-icon name="share-o" size="20" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <textarea
        placeholder="友善评论、理性发言、阳光心灵"
        ref="cmtInput"
        v-model.trim="inputContent"
        @blur="hideBox2"
      ></textarea>
      <van-button type="default" :disabled="inputContent.length == 0" @click="pubCmt">发布</van-button>
    </div>
  </div>
</template>

<script>
import { animate } from 'popmotion'
import { getCmtListAPI, addLikeCmtAPI, delLikeCmtAPI, pubCommentAPI } from '../../api/articleAPI'
export default {
  name: 'ArtCmt',
  props: {
    artId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      cmtList: [],
      offset: null,
      loading: false,
      finished: false,
      isShowBox1: true,
      cmtCount: 0,
      inputContent: ''
    }
  },
  methods: {
    async initCmtList () {
      const { data: res } = await getCmtListAPI(this.artId, this.offset)
      console.log(res)
      if (res.message === 'OK') {
        // console.log('搜索结果:', res)
        this.cmtList = [...this.cmtList, ...res.data.results]
        // console.log('这是请求的结果', this.searchList)
        this.offset = res.data.last_id

        this.cmtCount = res.data.total_count

        this.loading = false

        if (res.data.results.length === 0) {
          this.finished = true
        }
      }
    },
    onLoad () {
      this.initCmtList()
    },
    async addLike (item) {
      const { data: res } = await addLikeCmtAPI(item.com_id)
      if (res.message === 'OK') {
        // console.log(res)
        // 2. 在客户端，将点赞的状态设置为 true
        item.is_liking = true
      }
    },
    async delLike (item) {
      const { data: res } = await delLikeCmtAPI(item.com_id)
      console.log(res)
      if (res === '') {
        // 2.1 提示用户
        this.$toast.success('取消点赞成功！')
        // 2.2 手动更改关注的状态
        item.is_liking = false
      }
    },
    showBox2 () {
      this.isShowBox1 = false
      this.$nextTick(() => {
        this.$refs.cmtInput.focus()
      })
    },
    hideBox2 () {
      // 延迟100ms 显示box1
      setTimeout(() => {
        this.isShowBox1 = true
        this.inputContent = ''
      }, 100)
    },
    async pubCmt () {
      const { data: res } = await pubCommentAPI(this.artId, this.inputContent)
      if (res.message === 'OK') {
        // console.log(res)

        this.cmtCount++
        this.cmtList.unshift(res.data.new_obj)
        // 提示用户发表评论成功
        this.$toast.success('发表评论成功')
      }
    },
    scrollToCmtList () {
      // 滚动条 竖直距离
      const now = window.scrollY
      const dist = document.querySelector('.article-container').offsetHeight
      // console.log(now, dist)
      animate({
        from: now,
        to: dist,
        // 平滑滚动  ， 不断把最新的滚动的位置
        onUpdate: latest => window.scrollTo(0, latest)
      })
    }
  },
  created () {
    this.initCmtList()
  }
}
</script>

<style lang="less" scoped>
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}

// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
