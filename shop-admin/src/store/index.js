//创建vuex引入创建方法
import { createStore } from "vuex";
import conservator from "@/api/conservator";
import {toast} from "@/common/promptComponent";
import { setToken, getToken, removeToken , setTabs, getTabs,removeTabs} from "@/common/useCookie";
import getters from "./getters";
import app from "./modules/app";
// import permission from "./modules/permission";
//创建store实例
const store = createStore({
  //保存信息
  state: {
    token: getToken() || "",
    userInfo: {},
    menus: getTabs() || [],
    ruleNames: [],
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
      if (userInfo) {
        state.userInfo = userInfo;
        const { menus, ruleNames } = userInfo;
        state.menus = menus;
        state.ruleNames = ruleNames;
        setTabs(menus)
      }
    },
    //清空用户信息和token
        REMOVECOOKIE(state) {
        (state.token = ""),  (state.userInfo = {});
         removeToken();
         removeTabs()
    },
  },
  //异步方法 dispatch 调用
  actions: {
    //用户登录
    async login({ commit }, data) {
      let response = await conservator.loginApi(data);
      toast("登录成功");
      commit("SETTOKEN", response.token);
      return response;
    },
    //获取用户信息
    async getUserInfo({ commit }) {
      try {
        let response = await conservator.getUserInfoApi()
        commit("SETUSERINFO", response);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  },
  //vuex模块化
  modules: {
    app,
    // permission,
  },
});

export default store;
