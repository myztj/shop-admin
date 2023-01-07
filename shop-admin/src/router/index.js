import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import NotFound from "@/views/404/index.vue";

//创建路由实例
const routes = [
  //404路由，在没有找到当前路由时 展示404页面
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/Layout",
    name: "Layout",
    component: Layout,
    children:[
      {
        path:'/',
        name:'dashboard',
        meta:{
          title:'主控台'
        },
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录页",
    },
    component: () => import("@/views/login/index.vue"),
  }
];
//创建路由模式和路集合
  const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
 
