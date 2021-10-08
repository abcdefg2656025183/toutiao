import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tokenInfo: {}
  },
  mutations: {
    updateTokenInfo(state, payload) {
      // console.log(payload, "payload");
      state.tokenInfo = payload;
      this.commit("saveLogin");
    },
    saveLogin(state) {
      console.log(JSON.stringify(state));
      localStorage.setItem("state",JSON.stringify(state));
    }
  },
  actions: {},
  modules: {}
});
