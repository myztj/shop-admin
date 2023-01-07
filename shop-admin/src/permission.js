import router from "@/router";
import { getToken } from "@/common/useCookie";
import toast from "@/common/toast";
import store from "./store";
import{dynamicAdditionAddRouter} from '@/router/permission'
router.beforeEach(async (to, from, next) => {
  const token = getToken();
  if (!token && to.path != "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }

  if (token && to.path == "/login") {
    toast("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }
  //判断是否有token，如果有就获取信息，这样能保证每次刷新页面都能获取最新的用户信息
  if (token) {
    let {menus} = await store.dispatch("getUserInfo");
    if(menus && menus.length>0){
      dynamicAdditionAddRouter(menus)
    }
  }
  
  //动态设置页面title
  document.title = "积云教育 - " + (to.meta.title ? to.meta.title : "");
  next()
});
