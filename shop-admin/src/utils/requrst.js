import axios from "axios";
import { getToken } from "../common/useCookie";
const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
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
    if (response.status == 200) return response.data.data;
    return response;
  },
  (error) => {
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
