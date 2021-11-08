<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="userProfile.photo"
            @click="$refs.avatarRef.click()"
          />
          <input type="file" accept="image/*" @change="onFileChange" v-show="false" ref="avatarRef" />
        </template>
      </van-cell>

      <van-cell title="名称" is-link :value="userProfile.name" @click="onNameCellClick" />
      <van-dialog
        v-model="showNameDialog"
        title="修改名称"
        show-cancel-button
        :beforeClose="handlerBeforeClose"
      >
        <van-field
          v-model.trim="username"
          label="姓名"
          placeholder="请输入用户名"
          ref="userNameRef"
          input-align="center"
          maxlength="7"
        />
      </van-dialog>
      <van-cell title="生日" is-link :value="userProfile.birthday" @click="onBirthCellClick" />
      <van-dialog v-model="showBirthSheet" title="修改生日" :showConfirmButton="false">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showBirthSheet = false"
          @confirm="updateBirthday"
        />
      </van-dialog>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { updateUserProfileAPI, updateUserAvatarAPI } from '../api/userAPI'
import dayjs from 'dayjs'
export default {
  name: 'UserEdit',
  data () {
    return {
      // 姓名
      showNameDialog: false,
      username: '',
      // 是否展示修改生日的对话框
      showBirthSheet: false,
      // 最小可选日期（0 表示 1月份）
      minDate: new Date(1900, 0, 1),
      // 最大可选日期（11 表示 12月份）
      maxDate: new Date(2050, 11, 31),
      // 当前日期
      currentDate: ''

    }
  },
  computed: {
    ...mapState(['userProfile'])

  },
  methods: {
    ...mapActions(['getUserProfile']),
    onNameCellClick () {
      this.showNameDialog = true
      this.username = this.userProfile.name
      this.$nextTick(() => {
        this.$refs.userNameRef.focus()
      })
    },
    async handlerBeforeClose (action, done) {
      if (action === 'cancel') return done()
      // 获取username的值， 判断username值是否为空 或者长度是否大鱼7 如果满足这两个条件 不让弹框关闭 并且还要让输入框获取焦点
      if (this.username.length === 0 || this.username.length > 7) {
        this.$refs.userNameRef.focus()
        done(false)
        // 1. 提示用户“名称的长度为1-7个字符”
        this.$notify({ type: 'warning', message: '名称的长度为1-7个字符', duration: 2000 })
      }

      if (action === 'confirm') {
        const { data: res } = await updateUserProfileAPI({ name: this.username })
        if (res.message === 'OK') {
          done()
          this.getUserProfile()
          // 提示用户更新成功
          this.$notify({ type: 'success', message: '名称更新成功！', duration: 2000 })
        }
      }
    },
    onBirthCellClick () {
      this.showBirthSheet = true
      this.currentDate = new Date(this.userProfile.birthday)
    },
    async updateBirthday (value) {
      this.showBirthSheet = false
      const formateDate = dayjs(value).format('YYYY-MM-DD')
      // console.log(formateDate)

      const { data: res } = await updateUserProfileAPI({ birthday: formateDate })
      if (res.message === 'OK') {
        this.getUserProfile()
        // 提示用户更新成功
        this.$notify({ type: 'success', message: '生日更新成功！', duration: 2000 })
      }
    },
    async onFileChange (e) {
      const files = e.target.files
      // 如果没有选择任何文件，则不执行后续的业务逻辑
      if (files.length === 0) {
        return false
      } else {
        // formData 2.0
        const fd = new FormData()

        fd.append('photo', files[0])

        const { data: res } = await updateUserAvatarAPI(fd)

        if (res.message === 'OK') {
          this.getUserProfile()
          // 提示用户更新成功
          this.$notify({ type: 'success', message: '更新头像成功！', duration: 2000 })
        }
      }
    }
  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}

.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
