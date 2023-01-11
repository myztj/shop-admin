import { createApp } from "vue";
import App from "./App.vue";
//引入全局加载进度条css
import "nprogress/nprogress.css";
//引入router挂载全局
import router from "./router";
//全局引入windicss
import "virtual:windi.css";
//引入vuex
import store from "./store";
//引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//引入全局权限
import "@/permission";
//全局引入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
//全局引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//全局引入自定义指令，用于按钮或请求权限
import permission from '@/directives/permission.js'
// app.use(permission)
app.use(router).use(store).use(ElementPlus).use(permission);
app.mount("#app");
