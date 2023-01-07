import router from "@/router";
import { getToken } from "@/common/useCookie";
import toast from "@/common/toast";
import store from "./store";
import{dynamicAdditionAddRouter} from '@/router/permission'
//避免侧边栏切换时重复获取用户信息，（要写在路由守卫外面！！！）
let hasGetInfo = false
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
  //生命一个变量接收是否添加了新路由的状态，解决刷新页面404和白屏问题
  let hasNewRouter = false
  //判断是否有token，如果有就获取信息，这样能保证每次刷新页面都能获取最新的用户信息
  if (token && !hasGetInfo) {
    let {menus} = await store.dispatch("getUserInfo");
    //获取成功后变成true
    hasGetInfo = true
    if(menus && menus.length>0){
      //这里会返回状态
      hasNewRouter = dynamicAdditionAddRouter(menus)
    }
  }
  
  //动态设置页面title
  document.title = "积云教育 - " + (to.meta.title ? to.meta.title : "");
  //判断是否添加的新路由ture就to.fullPath false就放行
  hasNewRouter ? next(to.fullPath) : next()
});
