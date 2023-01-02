import { createApp } from "vue";
import App from "./App.vue";
//引入router挂载全局
import router from "./router";
//全局引入windicss
import "virtual:windi.css";
//引入vuex
import store from "./store";
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入全局权限
import '@/permission'
const app = createApp(App);
app.use(router).use(store).use(ElementPlus);
app.mount("#app");
