//创建vuex引入创建方法
import { createStore } from "vuex";
import conservator from "@/api/conservator";
import toast from "@/common/toast";
import { setToken, getToken, removeToken } from "@/common/useCookie";
import getters from "./getters";
import app from "./modules/app";
//创建store实例
const store = createStore({
  //保存信息
  state: {
    token: getToken() || "",
    userInfo: {},
  },
  //类似计算属性有缓存
  getters,
  //类似methods方法 同步 commit 调用
  mutations: {
    //存储token
    SETTOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    //设置用户信息
    SETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    //清空用户信息和token
    REMOVECOOKIE(state) {
      (state.token = ""), (state.userInfo = {});
      removeToken();
    },
  },
  //异步方法 dispatch 调用
  actions: {
    //用户登录
    async login({ commit }, data) {
      try {
        let response = await conservator.loginApi(data);
        console.log(response);
        toast("登录成功");
        commit("SETTOKEN", response.token);
        return response;
      } catch (error) {
        toast(error.response.data.msg, "error");
      }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
      try {
        let response = await conservator.getUserInfoApi();
        console.log(response);
        commit("SETUSERINFO", response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  //vuex模块化
  modules: {
    app,
  },
});

export default store;
