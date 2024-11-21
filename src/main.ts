import { createApp } from "vue";
import App from "./App.vue";
import setupPlugins from "@/plugins"; //注册组件插件


// 本地SVG图标
import "virtual:svg-icons-register";

// 引入全局样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import "animate.css";

const pxToRem = (pxNumber:number | string) :string=>{
    return pxNumber as number / 192 + 'rem'
}

App.prototype.$pxToRem = pxToRem

const app = createApp(App);
// 注册插件
app.use(setupPlugins);
app.mount("#app");
