import { createRouter, createWebHashHistory } from "vue-router";
import Index from "@/views/index.vue";
//创建路由实例
const routes = [
  {
    path: "/",
    name: "/",
    component: Index,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
];
//创建路由模式和路集合
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
