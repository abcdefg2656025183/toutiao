<template>
  <div id="login">
    <van-nav-bar title="黑马头条 - 登录" :fixed="true" />

    <van-form @submit="login">
      <van-field
        v-model="form.mobile"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="reles.mobile"
      />
      <van-field
        v-model="form.code"
        type="code"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="reles.code"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
        @click="login()"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi } from "../api/HomeApi";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        mobile: "13888888123",
        code: "246810"
      },

      reles: {
        mobile: [
          { required: true, message: "请输入正确的手机号", trigger: "onBlur" },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "onBlur"
          }
        ],
        code: [
          { required: true, message: "请输入正确的密码", trigger: "onBlur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["updateTokenInfo"]),
    async login() {
      let {data:res} = await loginApi(this.form);
      console.log(res);
      // if (res.data.message === "OK") {
      //   this.updateTokenInfo(res.data);
      //   this.$router.push("/");
      // }
    }
  }
};
</script>

<style lang="less" scoped></style>
