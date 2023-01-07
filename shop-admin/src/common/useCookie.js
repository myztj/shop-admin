import { useCookies } from "@vueuse/integrations/useCookies";
const TINKENKEY = "token";
const MENUSKEY = "menus";
const cookie = useCookies();
//设置token
const setToken = (token) => {
  return cookie.set(TINKENKEY, token);
};

//获取token
const getToken = () => {
  return cookie.get(TINKENKEY);
};

//删除token
const removeToken = () => {
  return cookie.remove(TINKENKEY);
};

//存储侧边栏信息
const setMenus = (menus) => {
  return cookie.set(MENUSKEY, JSON.stringify(menus));
};
//获取侧边栏信息
const getMenus = () => {
  return JSON.parse(cookie.set(MENUSKEY));
};
export { setToken, getToken, removeToken, setMenus, getMenus };
