<template>
  <div id="login">
    <van-nav-bar title="黑马头条 - 登录" :fixed="true" />

    <van-form @submit="onSubmit" style="margin-top">
      <van-field
        v-model="form.tel"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi } from "../api/userApi";
export default {
  name: "Login",
  data() {
    return {
      // 登录表单的数据，最终要双向绑定到 form 这个数据对象上
      form: {
        // 用户的手机号
        tel: "",
        // 登录的密码
        password: ""
      }
    };
  },

  methods: {
    async onSubmit(values) {
      console.log(values);
      res = await loginApi(this.form);
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped></style>
