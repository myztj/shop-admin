import axios from "axios";
//引入加载条
import nprogress from "nprogress";
import { getToken } from "../common/useCookie";
import toast from "@/common/toast"
import store from "../store";
const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
//请求拦截器
http.interceptors.request.use(
  (config) => {
    //开启加载条
    nprogress.start();
    const token = getToken();
    if (token) config.headers["token"] = getToken();
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);
//相应拦截器
http.interceptors.response.use(
  (response) => {
    //关闭加载条
    nprogress.done();
    if (response.status == 200) return response.data.data;
    return response;
  },
  (error) => {
    const msg = error.response.data.msg || '请求失败'
    toast(msg,'error')
    //token过期处理
    if(msg=='非法token，请先登录！'){
      store.commit('REMOVECOOKIE')
      location.reload()
    }
    //关闭加载条
    nprogress.done();
    return Promise.reject(error);
  }
);

const request = (options) => {
  options.method = options.method || "GET";
  if (options.method.toLowerCase() == "get") {
    options.params = options.data || options.params;
  }

  return http(options);
};

export default request;
