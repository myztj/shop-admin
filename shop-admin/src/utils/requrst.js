import axios from "axios";
//引入加载条
import nprogress from "nprogress";
import { getToken } from "../common/useCookie";
const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

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

http.interceptors.response.use(
  (response) => {
    //关闭加载条
    nprogress.done();
    if (response.status == 200) return response.data.data;
    return response;
  },
  (error) => {
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
