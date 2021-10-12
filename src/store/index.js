import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let initSate = {
  tokenInfo: {}
};
const stateStr = localStorage.getItem("state");
if (stateStr) {
  initSate = JSON.parse(stateStr);
}
export default new Vuex.Store({
  state: initSate,
  mutations: {
    updateTokenInfo(state, payload) {
      // console.log(payload, "payload");
      state.tokenInfo = payload;
      // console.log(state);
      this.commit("saveLogin");
    },
    saveLogin(state) {
      // console.log(JSON.stringify(state));
      localStorage.setItem("state", JSON.stringify(state));
    }
  },
  actions: {},
  modules: {}
});
