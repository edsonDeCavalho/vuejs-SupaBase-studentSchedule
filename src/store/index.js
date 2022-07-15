import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_data: {},
  },
  getters: {
  },
  mutations: {
    setUser(state, payload) {
      state.user_data = payload;
    },
  },
  actions: {
    setUser({commit}, payload) {
      commit("setUser", payload);
    },
  },
  modules: {
  }
})