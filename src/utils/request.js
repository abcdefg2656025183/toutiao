import axios from "axios";
import Vue from "vue";
import store from "../store";
import { Toast } from "vant";
Vue.use(Toast);

axios.defaults.baseURL = "http://www.liulongbin.top:8000";
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    const tokenStr = store.state.tokenInfo.data.token;

    if (tokenStr) {
      config.headers.Authorization = "Bearer " + tokenStr;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    Toast.clear();

    return response;
  },
  function(error) {
    // 对响应错误做点什么
    // console.log(1);
    Toast.fail("账号或密码输入错误，请重试");
    // return Promise.reject(error);
  }
);
export default axios;
