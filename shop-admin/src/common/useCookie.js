import { useCookies } from "@vueuse/integrations/useCookies";
const cookie = useCookies();
const TINKENKEY = "token";
const TABS_KEY = "tabs";
//设置token
const setToken = (token) => {
   cookie.set(TINKENKEY, token);
};

//获取token
const getToken = () => {
  return cookie.get(TINKENKEY);
};

//删除token
const removeToken = () => {
   cookie.remove(TINKENKEY);
};

//存储tbs导航
const setTabs = (tabs) => {
   cookie.set(TABS_KEY , tabs);
};
//获取tbs导航
const getTabs = () => {
  return cookie.get(TABS_KEY);
};

const removeTabs = ()=>{
   cookie.remove(TABS_KEY);
}
export { setToken, getToken, removeToken, setTabs, getTabs,removeTabs };
