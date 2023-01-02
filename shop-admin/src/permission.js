import router from "@/router";
import { getToken } from "@/common/useCookie";
import toast from "@/common/toast";
import store from "./store";
router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token && to.path != "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }

  if (token && to.path == "/login") {
    toast("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }
  if (token) {
    store.dispatch("getUserInfo");
  }
  next();
});
